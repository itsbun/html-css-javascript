/**
 * Verify email script logic
 */
import {
  initOtpInput,
  getOtpValue,
} from "../../components/otp-input/otp-input.js";

/**
 * Validation: verify email form
 */
const validateVerifyEmail = () => {
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

    const code = getOtpValue(form);

    if (code.length !== 6) {
      alert("Please enter the full verification code.");
      return;
    }

    alert(`Code submitted: ${code}`);
  });
};

export const verifyEmailScript = () => {
  initOtpInput();
  validateVerifyEmail();
};
