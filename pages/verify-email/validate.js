export const validateVerifyEmail = () => {
  const form = document.getElementById("otp-form");

  if (!form) {
    return;
  }

  if (form.dataset.verifyEmailValidated === "true") {
    return;
  }

  form.dataset.verifyEmailValidated = "true";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const code = formData
      .getAll("otp")
      .map((value) => String(value).trim())
      .join("");

    if (code.length !== 6) {
      alert("Please enter the full verification code.");
      return;
    }

    alert(`Code submitted: ${code}`);
  });
};
