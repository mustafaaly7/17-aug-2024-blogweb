import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 





  } from "../firebase.js"
//   if(localStorage.getItem("userId")){
//     window.location.replace("../index.html")

// }
// console.log(app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword);


  const show = document.querySelector(".show")
  const loginEmail = document.getElementById("loginEmail")
const loginpw = document.getElementById("loginpw")

// show and hide toggle function
const showpw = () =>{

    if(show.innerHTML == `<i class="fa-solid fa-eye"></i>`){
        loginpw.setAttribute("type" , "text")
        show.innerHTML =`<i class="fa-solid fa-eye-slash"></i>`
    }else{
        loginpw.setAttribute("type" , "password")
    show.innerHTML = `<i class="fa-solid fa-eye"></i>`
    
    }
    
    }


// login function 


const loginHandler = async ()=>{

try {
    
const response = await signInWithEmailAndPassword(auth ,loginEmail.value , loginpw.value )
localStorage.setItem("userId" , response.user.uid)
alert("user Succesfully Signed in")
window.location.replace("../index.html")

} catch (error) {
    alert(error.message)

}




}


















window.showpw = showpw

window.loginHandler = loginHandler