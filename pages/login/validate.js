import { isValidEmail } from "../../scripts/regex.js";

export const validateLogin = () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    const emailError = loginForm.querySelector(".emailError");
    const passwordError = loginForm.querySelector(".passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    }

    if (isValid) {
      alert("Login successful!");
      loginForm.reset();
    }
  });
};
