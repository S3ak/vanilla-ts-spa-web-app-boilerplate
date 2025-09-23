/**
 * Renders the login form and handles login logic.
 * @param container HTMLElement to render into
 */
/**
 * LoginPage: Returns HTML for the login form.
 */
import { renderRoute } from "../router";
import { loginUser, fetchApiKey } from "../services/api/client";
import { setLocalItem } from "../utils/storage";

document.addEventListener("DOMContentLoaded", () => {
  // Show registration success message if present
  const registerSuccess = localStorage.getItem("registerSuccess");
  if (registerSuccess) {
    const formError = document.getElementById("form-error");
    if (formError) formError.textContent = registerSuccess;
    localStorage.removeItem("registerSuccess");
  }
  const form = document.getElementById("login-form") as HTMLFormElement;
  if (form) {
    const submitBtn = form.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;
    let spinner: HTMLSpanElement | null = null;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;
      const formError = document.getElementById("form-error");

      // Disable button and show spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-60", "cursor-not-allowed");
        spinner = document.createElement("span");
        spinner.className =
          "ml-2 animate-spin inline-block w-4 h-4 border-2 border-t-2 border-gray-200 border-t-indigo-600 rounded-full";
        submitBtn.appendChild(spinner);
      }
      if (formError) formError.textContent = "";

      try {
        const result = await loginUser({ email, password });
        console.log("Login API result:", result);
        if (result.errors) {
          if (formError)
            formError.textContent =
              result.errors[0]?.message || "Login failed.";
        } else {
          if (result.data.accessToken)
            setLocalItem("accessToken", result.data.accessToken);
          if (result.data.name) {
            setLocalItem("user", result.data.name);
          }
          const apikey = await fetchApiKey(result.data.accessToken);
          if (apikey) setLocalItem("apiKey", apikey);
          // Show login success message
          if (formError)
            formError.textContent = "Login successful! Redirecting...";
          setTimeout(() => {
            history.pushState({ path: "/" }, "", "/");
            renderRoute("/");
          }, 1000);
        }
      } catch (err) {
        if (formError)
          formError.textContent = "Login failed. Please try again.";
      } finally {
        // Re-enable button and remove spinner
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
          if (spinner) submitBtn.removeChild(spinner);
        }
      }
    });
  }
});

export default async function LoginPage() {
  return `
    <main
      class="flex-1 flex justify-center items-center px-4 pt-24 pb-12"
    >
      <section
        class="bg-gray-100 text-blue-900 rounded-lg shadow-md p-8 w-full max-w-md"
      >
        <h2 class="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Login to Social Media
        </h2>
        <form class="flex flex-col gap-6" id="login-form">
          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="@stud.noroff.no"
              required
              class="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-blue-900 placeholder-blue-400 focus:border-indigo-600 focus:ring focus:ring-indigo-400"
            />
            <p class="text-sm text-red-500" id="email-error"></p>
          </div>
          <!-- Password -->
          <div class="flex flex-col gap-2">
            <label
              for="password"
              class="text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              required
              class="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-blue-900 placeholder-blue-400 focus:border-indigo-600 focus:ring focus:ring-indigo-400"
            />
            <p class="text-sm text-red-500" id="password-error"></p>
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="register-button w-full py-2 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <p class="text-sm text-green-600 mt-2" id="form-error"></p>
        </form>
        <!-- Register Link -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="/register" class="text-indigo-600 hover:underline"
            >Register here</a
          >
        </p>
      </section>
    </main>
  `;
}
