document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const submitButton = document.querySelector(".button");

    const validateEmail = (email) => {
        var mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return mailFormat.test(String(email).toLocaleLowerCase());
    };

    function validateInput(input, condition, errorMessage) {
        let errorContainer = input.closest(".mb-4"); // Chắc chắn lấy đúng phần chứa lỗi
let errorElement = errorContainer.querySelector(".div_error");
let inputContainer = input.closest(".input-container"); // Đảm bảo lấy đúng vị trí
   


        let iconElement = errorContainer.querySelector(".error-icon");
    
        if (!errorElement) return;
    
        if (condition) {
            input.classList.remove("red");
            input.classList.add("green");
            errorElement.textContent = "";
            if (iconElement) iconElement.style.display = "none";
        } else {
            input.classList.remove("green");
            input.classList.add("red");
            errorElement.textContent = errorMessage;
    
            if (!iconElement) {
                iconElement = document.createElement("i");
                iconElement.classList.add("fas", "fa-exclamation-triangle", "error-icon");
                inputContainer.appendChild(iconElement);
            }
            iconElement.style.display = "block";
        }
    }
    
    
 
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailValid = validateEmail(email.value);
        const phoneValid = phone.value.length >= 10;
        const passwordValid = password.value.length >= 6;
        const passwordsMatch = password.value === confirmPassword.value;

        validateInput(email, emailValid, "Invalid email format");
        validateInput(phone, phoneValid, "Phone number must be at least 10 digits");
        validateInput(password, passwordValid, "Password must be at least 6 characters");
        validateInput(confirmPassword, passwordsMatch, "Passwords do not match");

       
        if (emailValid && phoneValid && passwordValid && passwordsMatch) {
            // Lưu thông tin vào localStorage
            localStorage.setItem("fullName", fullName.value);
            localStorage.setItem("email", email.value);
            localStorage.setItem("phone", phone.value);
            localStorage.setItem("password", password.value);
            alert("Registration successful!");
            form.reset();
        }
    });

    [email, phone, password, confirmPassword].forEach(input => {
        input.addEventListener("input", function () {
            if (input === email) {
                validateInput(email, validateEmail(email.value), "Invalid email format");
            } else if (input === phone) {
                validateInput(phone, phone.value.length >= 10, "Phone number must be at least 10 digits");
            } else if (input === password) {
                validateInput(password, password.value.length >= 6, "Password must be at least 6 characters");
            } else if (input === confirmPassword) {
                validateInput(confirmPassword, password.value === confirmPassword.value, "Passwords do not match");
            }
        });
    });
  

  
});