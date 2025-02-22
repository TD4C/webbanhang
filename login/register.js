document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form");
    const fullNameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    function validateInput(input, condition, errorMessage) {
        let errorContainer = input.closest(".mb-4");
        let errorElement = errorContainer.querySelector(".div_error");
        let inputContainer = input.closest(".input-container");
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

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }

    function checkFormValidity() {
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        let valid = true;

        if (!fullName) {
            validateInput(fullNameInput, false, "Vui lòng nhập họ tên.");
            valid = false;
        }

        if (!email || !validateEmail(email)) {
            validateInput(emailInput, false, email ? "Email không hợp lệ." : "Vui lòng nhập email.");
            valid = false;
        }

        if (!phone || !validatePhone(phone)) {
            validateInput(phoneInput, false, phone ? "Số điện thoại không hợp lệ." : "Vui lòng nhập số điện thoại.");
            valid = false;
        }

        if (!password) {
            validateInput(passwordInput, false, "Vui lòng nhập mật khẩu.");
            valid = false;
        }

        if (!confirmPassword) {
            validateInput(confirmPasswordInput, false, "Vui lòng nhập lại mật khẩu.");
            valid = false;
        } else if (confirmPassword !== password) {
            validateInput(confirmPasswordInput, false, "Mật khẩu nhập lại không khớp.");
            valid = false;
        }

        return valid;
    }

    fullNameInput.addEventListener("input", () => {
        validateInput(fullNameInput, fullNameInput.value.trim() !== "", "Vui lòng nhập họ tên.");
    });

    emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();
        validateInput(emailInput, email !== "" && validateEmail(email), email ? "Email không hợp lệ." : "Vui lòng nhập email.");
    });

    phoneInput.addEventListener("input", () => {
        const phone = phoneInput.value.trim();
        validateInput(phoneInput, phone !== "" && validatePhone(phone), phone ? "Số điện thoại không hợp lệ." : "Vui lòng nhập số điện thoại.");
    });

    passwordInput.addEventListener("input", () => {
        const password = passwordInput.value.trim();
        validateInput(passwordInput, password !== "", "Vui lòng nhập mật khẩu.");
        validateInput(confirmPasswordInput, confirmPasswordInput.value.trim() === password, "Mật khẩu nhập lại không khớp.");
    });

    confirmPasswordInput.addEventListener("input", () => {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        validateInput(confirmPasswordInput, confirmPassword === password, "Mật khẩu nhập lại không khớp.");
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!checkFormValidity()) return;

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = storedUsers.some(user => user.email === email);

        if (emailExists) {
            validateInput(emailInput, false, "Email đã được sử dụng.");
            return;
        }

        const newUser = { fullName, email, phone, password };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        alert("Đăng ký thành công!");
        registerForm.reset();
        document.querySelectorAll(".green").forEach(input => input.classList.remove("green"));
    });
});
