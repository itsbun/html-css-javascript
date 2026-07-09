export const initOtpInput = () => {
  const form = document.getElementById("otp-form");
  const inputs = form?.querySelectorAll(".otp-field");

  if (!form || !inputs || !inputs.length) {
    return;
  }

  if (form.dataset.otpInitialized === "true") {
    return;
  }

  form.dataset.otpInitialized = "true";

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (event) => {
      event.preventDefault();

      const pasted = (event.clipboardData?.getData("text") || "")
        .replace(/\D/g, "")
        .slice(0, inputs.length - index)
        .split("");

      pasted.forEach((digit, offset) => {
        inputs[index + offset].value = digit;
      });

      const nextFocusIndex = Math.min(index + pasted.length, inputs.length - 1);
      inputs[nextFocusIndex].focus();
    });
  });
};

export const getOtpValue = (form = document.getElementById("otp-form")) => {
  if (!form) {
    return "";
  }

  return Array.from(form.querySelectorAll(".otp-field"))
    .map((input) => input.value.trim())
    .join("");
};
