import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 
,setDoc


,ref,
uploadBytesResumable,
getDownloadURL,storage


  } from "../firebase.js"




if(!localStorage.getItem("userId")){
window.location.replace("./pages/login.html")


}
 
const titleBlog = document.getElementById("titleBlog")
const contentBlog = document.getElementById("contentBlog")
const blogimg = document.getElementById("blogimg")
const parent = document.querySelector(".parent")
const uid = localStorage.getItem("userId")

const flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked")


// on reload Function 
const onLoad = async() =>{
  try {
    parent.innerHTML=``
    const querySnapshot  = await getDocs (collection(db , "blogs"))
    let tempArr = []
  querySnapshot.forEach((doc) =>{
if(doc.data().privacy){
const obj = {
  id: doc.id,
...doc.data()


}

// renderUi(tempArr)


tempArr.push(obj)
}
for(var key of tempArr){
parent.innerHTML+=`<div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <img src="${key.imgUrl}" alt="">
                <h5 class="card-title">${key.title}</h5>
                <p class="card-text">${key.content}</p>
                <a href="#" class="btn btn-primary">Delete Blog</a>
              </div>
            </div>
          </div>
`

}





})

console.log(tempArr);


} catch (error) {
  alert(error.message)
  
}


  
}



// image upload function 
const imgUpload = (file) =>{
  return new Promise((resolve, reject) => {
    // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
          case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      // switch (error.code) {
      //   case 'storage/unauthorized':
      //     // User doesn't have permission to access the object
      //     break;
      //   case 'storage/canceled':
      //     // User canceled the upload
      //     break;
  
      //   // ...
  
      //   case 'storage/unknown':
      //     // Unknown error occurred, inspect error.serverResponse
      //     break;
      // }
      reject(error)
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        resolve(downloadURL)
      });
    }
  );
  
  })
  
  
    
  }


// post creation function 

const postBlog = async() =>{
try {
  
// console.log(blogimg.files[0]);
// console.log(titleBlog.value);
// console.log(contentBlog.value);
// console.log(flexSwitchCheckChecked.checked);

const imgUrl = await imgUpload(blogimg.files[0])


const blogObj = {
  title : titleBlog.value,
  content :contentBlog.value ,
  imgUrl : imgUrl,
  privacy : flexSwitchCheckChecked.checked,
  uid : uid
}
console.log( imgUrl, blogObj);
await addDoc(collection(db, "blogs"), blogObj);
// console.log(blogUpload);

var myModalEl = document.getElementById("exampleModal");
var modal = bootstrap.Modal.getInstance(myModalEl);
modal.hide();

alert("Blog Created Sucessfully.");
onLoad()


} catch (error) {
  alert(error.message)
}



}












// signout function 

const signOut = () =>{
  
localStorage.removeItem("userId")
window.location.replace("./pages/login.html")
alert("Signed Out successfully!!")



}

const postInput = document.getElementById("postInput")









window.postBlog = postBlog
window.signOut = signOut
window.addEventListener("load" , onLoad) 