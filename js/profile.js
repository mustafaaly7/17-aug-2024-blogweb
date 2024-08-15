import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 

    , getDoc,doc,setDoc



  } from "../firebase.js"

  if(!localStorage.getItem("userId")){
    window.location.replace("./pages/login.html")
    
    
    }

const uid = localStorage.getItem("userId")

    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const phn = document.getElementById("phn")
    const age = document.getElementById("age")
    const country = document.getElementById("country")
    const city = document.getElementById("city")
const image = document.getElementById("image")

    // load function 

    const getProfile   = async () =>{

try {
    const docRef = doc(db, "user", uid);

   const docSnap = await getDoc(docRef);
   
// docSnap.forEach((doc) =>{
//     const obj = {
//         id :doc.id
//         ,...doc.data()
//     }
// console.log(obj);


// })


if (docSnap.exists()) {
    const obj = {
        id: docSnap.id,
        ...docSnap.data()
    };
    // console.log(obj);
    fullName.value = docSnap.data().fullName
    email.value = docSnap.data().email
    phn.value = docSnap.data().phn
    age.value = docSnap.data().age
    country.value = docSnap.data().country
    city.value = docSnap.data().city

} else {
    console.log("No such Info");
}



} catch (error) {
    console.log(error.message);
    


}



        


    }

// edit btn 

const editProfile = () =>{
    fullName.removeAttribute("disabled")
    email.removeAttribute("disabled")
    phn.removeAttribute("disabled")
    age.removeAttribute("disabled")
    country.removeAttribute("disabled")
    city.removeAttribute("disabled")
    image.removeAttribute("disabled")


}



// save profile 


const saveProfile = async ()=>{

try {
    
const obj = {

    fullName: fullName.value,
    email: email.value,
    phn: phn.value,
    age: age.value,
    country: country.value,
    city: city.value,


   
}

await setDoc(doc(db, "user", uid),obj);

fullName.disabled = true
    email.disabled = true
    phn.disabled = true
    age.disabled = true
    country.disabled = true
    city.disabled = true
    image.disabled = true

getProfile()
} catch (error) {
    alert(error.message)
}





}





    const signOut = () =>{

        localStorage.removeItem("userId")
        window.location.replace("./login.html")
        alert("Signed Out successfully!!")
        
        
        
        }
        
        // const postInput = document.getElementById("postInput")
        
window.signOut = signOut
window.editProfile = editProfile
window.saveProfile = saveProfile
        window.addEventListener("load" , getProfile())