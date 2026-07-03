/**
 * Router module for handling client-side navigation and page loading
 */
import { routes } from "./routes.js";
import { loadLayout, toggleNavigation } from "../scripts/common.js";
import { initOtpInput } from "../components/otp-input/otp-input.js";
import { validateForgotPassword } from "../pages/forgot-password/validate.js";
import { validateLogin } from "../pages/login/validate.js";
import { validateRegister } from "../pages/register/validate.js";
import { validateResetPassword } from "../pages/reset-password/validate.js";
import { validateVerifyEmail } from "../pages/verify-email/validate.js";

const getCurrentPage = () => {
  const page = new URLSearchParams(window.location.search).get("page");

  switch (page) {
    case "login":
      return "login";
    case "register":
      return "register";
    case "forgot_password":
      return "forgot_password";
    case "reset_password":
      return "reset_password";
    case "verify_email":
      return "verify_email";
    default:
      return "login";
  }
};

const router = async () => {
  const page = getCurrentPage();
  toggleNavigation(`?page=${page}`);
  const pageHtmlPath = routes[page] || routes.login;

  try {
    const response = await fetch(pageHtmlPath);
    const htmlContent = await response.text();
    document.querySelector(".content").innerHTML = htmlContent;
    await loadLayout();

    switch (page) {
      case "login":
        validateLogin();
        break;
      case "register":
        validateRegister();
        break;
      case "forgot_password":
        validateForgotPassword();
        break;
      case "reset_password":
        validateResetPassword();
        break;
      case "verify_email":
        initOtpInput();
        validateVerifyEmail();
        break;
      default:
        break;
    }
  } catch (error) {
    alert(`Error when loading, please try again later`);
    console.error("Error loading page:", error);
  }
};

export const initRouter = () => {
  window.addEventListener("popstate", router);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("?page=")) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  });

  navigateTo(`?page=${getCurrentPage()}`, true);
};

export const navigateTo = (path, replace = false) => {
  const nextUrl = new URL(window.location.href);
  const nextPage = new URLSearchParams(path).get("page") || "login";

  nextUrl.search = `?page=${nextPage}`;

  if (replace) {
    window.history.replaceState({}, "", nextUrl);
  } else {
    window.history.pushState({}, "", nextUrl);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
};
