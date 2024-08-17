import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 
,setDoc,deleteDoc,doc,getDoc,updateDoc 


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
const editBlogparent = document.querySelector(".editBlogparent")
// console.log(editBlogparent);



// delete function blog 

const deleteBlog = async(ele)=>{

  try {
    await deleteDoc(doc(db, "blogs", ele.id));
  alert("Blog Deleted Successfully")
  onLoad()
} catch (error) {
  alert(error.message)
}

}


// saving edit blog 

const saveEditBlog = async(ele)=>{

try {
  const editImgurl = await imgUpload(editblogimg.files[0])

const editedObj = {
  title:  edittitleBlog.value        ,
  content:   editcontentBlog.value       ,
  privacy:    editflexSwitchCheckChecked.checked      ,
imgUrl : editImgurl


}
const blogRef = doc(db, "blogs", ele.id);


await updateDoc(blogRef, editedObj);

// closing Modal After save changes 



var myModalEl = document.getElementById("editBlogmodal");
var modal = bootstrap.Modal.getInstance(myModalEl);
modal.hide();


alert("succesfully edited")

onLoad()

} catch (error) {
  alert(error.message)




}



  
}








editBlogparent.innerHTML = `<div class="modal fade " id="editBlogmodal" tabindex="-1" aria-labelledby="editBlogmodalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content createBlogmodal">
             <div class="modal-header">
               <h1 class="modal-title fs-5" id="editBlogmodalLabel">Edit Your Blog</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <div class="blogTitle">
                 <h3>Enter Your Blog Title :</h3>
                 <div class="input-group mb-3">
   
                   <input type="text" class="form-control title"  aria-label="Sizing example input" id="edittitleBlog"
                     aria-describedby="inputGroup-sizing-default">
                 </div>
                 <h3>Enter Your Blog Content</h3>
                 <div class="input-group">
   
                   <textarea class="form-control blogContent"  id="editcontentBlog" aria-label="With textarea" maxlength="500"
                     cols="40" rows="8"></textarea>
                 </div>
                 <!-- image  -->
                 <h3>Enter an Image</h3>
                 <div class="mb-3">
                   <input type="file" id="editblogimg">
                 </div>
   
                 <!-- public or private check box  -->
                 <h3>Privacy</h3>
                 <div class="form-check form-switch">
                 <input class="form-check-input" type="checkbox" id="editflexSwitchCheckChecked" checked>
                   <label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
                 </div>
               </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button type="button" class=" changeEdit btn btn-primary" id="" onclick="saveEditBlog(this)">Save Changes</button>
             </div>
           </div>
           </div>`
           
           const edittitleBlog = document.getElementById("edittitleBlog")
           const editcontentBlog = document.getElementById("editcontentBlog")
           const editblogimg = document.getElementById("editblogimg")
           const editflexSwitchCheckChecked = document.getElementById("editflexSwitchCheckChecked")
           const changeEdit = document.querySelector(".changeEdit")
           
// edit Blog 
const editBlog = async(ele) =>{
  try {
    const docRef = doc(db, "blogs", ele.id);
    
    const docSnap = await getDoc(docRef);
    
    
    
    if (docSnap.exists()) {
      const obj = {
        id: docSnap.id,
        ...docSnap.data()
        };
        
        edittitleBlog.value = obj.title
editcontentBlog.value = obj.content
// editblogimg.value = obj.
editflexSwitchCheckChecked.checked = obj.privacy
changeEdit.id = obj.id        
        
        
        
        
        
        

} else {
   console.log("No such Info");
}



  
} catch (error) {
  alert(error.message)
}



}






// on reload Function 
const onLoad = async() =>{
  try {
    const querySnapshot  = await getDocs (collection(db , "blogs"))
    let tempArr = []
    parent.innerHTML = ``
    querySnapshot.forEach((doc) =>{
      if(doc.data().privacy){
        const obj = {
  id: doc.id,
...doc.data()


}
tempArr.push(obj)



}





})

renderUi(tempArr)
// console.log(tempArr);


} catch (error) {
  alert(error.message)
  
}


  
}


// Render UI FUnction 

const renderUi =  async(blogArr)=>{
// console.log(blogArr , "blogArray");

try {
  for(var key of blogArr){
    parent.innerHTML+=`<div class="col-sm-6 mb-3 mb-sm-0 my-4">
                <div class="card">
                  <div class="card-body">
                    <img src="${key.imgUrl}" alt="">
                    <h5 class="card-title">${key.title}</h5>
                    <p class="card-text">${key.content}</p>
      <button class="btn btn-danger"  id="${key.id}" onclick="deleteBlog(this)">Delete</button>
      <button class="btn btn-info" id="${key.id}" onclick="editBlog(this)" data-bs-toggle="modal"
                    data-bs-target="#editBlogmodal">Edit</button>
                    
                  </div>
                </div>
              </div>
    `
    
    }
    
} catch (error) {
  
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

// const postInput = document.getElementById("postInput")







window.saveEditBlog = saveEditBlog
window.editBlog = editBlog
window.postBlog = postBlog
window.signOut = signOut
window.deleteBlog = deleteBlog
window.addEventListener("load" , onLoad) 