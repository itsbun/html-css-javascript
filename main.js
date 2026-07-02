/**
 * Main entry point for the application
 */
import { loadLayout } from "./scripts/common.js";
import { initRouter } from "./apps/router.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();
  await initRouter();
});
