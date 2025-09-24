// Attach SPA navigation event handler to header links once at startup
document.addEventListener("DOMContentLoaded", () => {
  const navLinks: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll("#js-primary-nav a");
  navLinks.forEach((link) =>
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const path = link.getAttribute("href");
      if (typeof path === "string") {
        history.pushState({ path: path }, "", path);
        renderRoute(path);
      }
    })
  );
});
import "./style.css";
import { renderRoute } from "./router";
import {
  handleGlobalError,
  catchUnhandledRejection,
} from "./services/error/error";

// Render initial content based on the current path
renderRoute(window.location.pathname);

window.onerror = handleGlobalError;

window.addEventListener("unhandledrejection", catchUnhandledRejection);

// We need to listen to the browser changes
window.addEventListener("popstate", (event) => {
  // The 'event.state' object contains the state we pushed earlier.
  // If the state is null, it might be the initial page load.
  const path = event.state ? event.state.path : window.location.pathname;
  console.log(`Navigating to ${path} via popstate`);
  renderRoute(path);
});

// Need to check that the browser supports service workers
// if ("serviceWorker" in navigator) {
//   // Register our service worker file
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((registration) => {
//         console.log("Service Worker registered successfully:", registration);
//       })
//       .catch((error) => {
//         console.log("Service Worker registration failed:", error);
//       });
//   });
// }

// Navigation event handler is now managed in router/index.ts after each route render.
