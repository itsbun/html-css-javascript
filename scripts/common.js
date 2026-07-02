/**
 * Utility functions for handling UI/UX tasks, such as loading layouts, common events,...
 */

/**
 * Load navigation and intro panel components into the page
 * This layout is used in all pages, so we can load it dynamically to avoid code duplication.
 */
export const loadLayout = async () => {
  const elements = document.querySelectorAll("[data-include]");
  for (let el of elements) {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      const htmlContent = await response.text();
      el.outerHTML = htmlContent;
    } catch (error) {
      alert(`Error when loading, please try again later`);
      console.error("Error loading component:", error);
    }
  }
};

/**
 * Toggle the active state of navigation items based on the current path
 */
export const toggleNavigation = (currentPath) => {
  const navItems = document.querySelectorAll(".header__nav-item");
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === currentPath);
  });
};
