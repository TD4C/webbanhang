document.addEventListener("DOMContentLoaded", function(){
     const  fname = document.getElementById("full-name");
     const   email =document.getElementById("email");
     const   phone =document.getElementById("phone");
     const   password =document.getElementById("password");
     const   cfpassword=document.getElementById("confirm-password");
     const form =document.querySelector("form");
     function validateinput(input, dk, message){
          let container = input.closest(".mb-4");
          let  errorinput = container.querySelector(".div_error");
          let inputcontainer = input.closest(".input-container");
          let erroicon = inputcontainer.querySelector(".error-icon");
          if(!errorinput) return;
          if(dk){
            input.classList.add("green");
            input.classList.remove("red");
            errorinput.textContent="";
            if(errorinput) errorinput.style.display = "none";          
     } else{
        input.classList.remove("green");
        input.classList.add("red");
        errorinput.textContent=message;
            if(!erroicon){
                erroicon=document.createElement("i");
                erroicon.classList.add("fas", "fa-exclamation-triangle","error-icon");
                inputcontainer.appendChild(erroicon);
               
            }
            erroicon.style.display = "block";
     } }

     function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }
    function checkform(){
        const fullname = fname.value.trim();
        const checkemail = email.value.trim();
        const checkphone = phone.value.trim();
        const checkpassword = password.value.trim();
        const checkconfirmpassword = cfpassword.value.trim();
        let valid = true;
        if(!fullname){
           validateinput(fname,false,"vui long nhap ten!");
           valid =false;
        }
        if(!checkemail || !validateEmail(checkemail)){
            validateinput(email,false, email?"email khong hop le":"vui long nhap email");
            valid =false;
        }
        if(!checkphone || !validatePhone(checkphone)){
            validateinput(phone,false,phone?"so dien thoai khong hop le":"vui long nhap so dien thoai");
            valid =false;
        }
        if(!checkpassword){
            validateinput(password,false,"vui long nhap mat khau");
            valid =false;
        }
        if(!checkconfirmpassword ){
            validateinput(cfpassword,false,"vui long nhap lai mat khau");
            valid =false;
        } else if(checkconfirmpassword!=checkpassword){
            validateinput(cfpassword,false,"mat khau khong khop");
            valid =false;
        }
        return valid;
    }
    fname.addEventListener("input",()=>{
        validateinput(fname,fname.value.trim()!="","vui long nhap ten");
    });
    email.addEventListener("input",()=>{
        const checkemail = email.value.trim();
        validateinput(email,checkemail!=""&& validateEmail(checkemail),checkemail?"email khong hop le":"vui long nhap email");
    });
    phone.addEventListener("input",()=>{
     const checkphone =phone.value.trim();
     validateinput(phone,checkphone!="" && validatePhone(checkphone),checkphone?"so dien thoai khong hop le":"vui long nhap so dien thoai");
    });
    password.addEventListener("input",()=>{
       const checkpassword = password.value.trim();
       validateinput(password,checkpassword!="","vui long nhap mat khau");
       validateinput(cfpassword,cfpassword.value.trim()===checkpassword,"mat khau nhap lai khong khop");
    });
    cfpassword.addEventListener("input",()=>{
        const checkpassword = password.value.trim();
          const checkconfirmpassword =cfpassword.value.trim();
          validateinput(cfpassword,checkconfirmpassword===checkpassword,"mat khau nhap lai khong khop");
    });
 form.addEventListener("submit",(even)=>{
    even.preventDefault();
    if(!checkform()) return;
    const name = fname.value.trim();
    const femail = email.value.trim();
    const fphone=phone.value.trim();
    const fpassword = password.value.trim();
    const confirmPassword = cfpassword.value.trim();
    const storeuser = JSON.parse(localStorage.getItem("users"))||[];
        const emaile =storeuser.some((e)=>e.femail==femail);
        if(emaile){
            validateinput(email,false,"email da duoc su dung");
            return;
        }
        const newuser = {name,femail,fphone,fpassword};
        storeuser.push(newuser);
          localStorage.setItem("users",JSON.stringify(storeuser));
          alert("Dang ky thanh cong!");
          form.reset();
          document.querySelectorAll(".green").forEach(e =>e.classList.remove("green"));
 })

});
