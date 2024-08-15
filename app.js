import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 
,setDoc




  } from "../firebase.js"




if(!localStorage.getItem("userId")){
window.location.replace("./pages/login.html")


}
 
const postBlog = async() =>{




}


const signOut = () =>{

localStorage.removeItem("userId")
window.location.replace("./pages/login.html")
alert("Signed Out successfully!!")



}

const postInput = document.getElementById("postInput")









window.postBlog = postBlog
window.signOut = signOut