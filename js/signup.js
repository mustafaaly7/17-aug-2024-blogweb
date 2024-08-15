import {
    app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword 


    ,doc, setDoc


  } from "../firebase.js"
//   console.log(app,db,collection, addDoc,getDocs ,auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword);
  

// if(localStorage.getItem("userId")){
//     window.location.replace("../index.html")
// }


   const show = document.querySelector(".show")
   const signUppw = document.querySelector("#signUppw")

    const fullNamesignup = document.getElementById("fullNamesignup")
    const phnsignup = document.getElementById("phnsignup")
    const emailSignup = document.getElementById("emailSignup")




// show and hide toggle function

const showpw = () =>{

if(show.innerHTML == `<i class="fa-solid fa-eye"></i>`){
    signUppw.setAttribute("type" , "text")
    show.innerHTML =`<i class="fa-solid fa-eye-slash"></i>`
}else{
    signUppw.setAttribute("type" , "password")
show.innerHTML = `<i class="fa-solid fa-eye"></i>`

}

}


// signup function 

const signUphandler = async()=>{
try {
    const response = await createUserWithEmailAndPassword(auth , emailSignup.value , signUppw.value)
const userInfo = {

  fullName:fullNamesignup.value,
   phoneNumber:phnsignup.value,
   email:emailSignup.value,

}
const reference = await setDoc(doc(db,'user',response.user.uid),userInfo)  
alert("User Succesfully Signed Up")  
window.location.href = "./login.html"
console.log(reference);

    // console.log(response);
    
} catch (error) {
    alert(error.message)


}

}

































   
  window.showpw = showpw
  window.signUphandler = signUphandler