/**
 * Router module for handling client-side navigation and page loading
 */
import { routes } from "./routes.js";
import { toggleNavigation } from "../scripts/common.js";
import { validateForgotPassword } from "../validates/forgot-password.js";
import { validateLogin } from "../validates/login.js";
import { validateRegister } from "../validates/register.js";

const getCurrentPage = () => {
  const page = new URLSearchParams(window.location.search).get("page");

  switch (page) {
    case "login":
      return "login";
    case "register":
      return "register";  
    case "forgot_password":
      return "forgot_password";
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
