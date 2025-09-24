/**
 * Renders the register form and handles registration logic.
 * @param container HTMLElement to render into
 */
/**
 * RegisterPage: Returns HTML for the register form.
 */

function setupRegisterFormValidation() {
  const form = document.getElementById("register-form") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const confirmPasswordInput = document.getElementById(
        "confirmPassword"
      ) as HTMLInputElement;
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const name = email.split("@")[0];

      // Error elements
      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");
      const passwordConfirmError = document.getElementById(
        "password-confirm-error"
      );
      const formError = document.getElementById("form-register-error");

      // Reset errors
      if (emailError) emailError.textContent = "";
      if (passwordError) passwordError.textContent = "";
      if (passwordConfirmError) passwordConfirmError.textContent = "";
      if (formError) formError.textContent = "";

      let hasError = false;

      // Noroff email validation
      if (!email.endsWith("@stud.noroff.no")) {
        if (emailError)
          emailError.textContent = "Email must be a @stud.noroff.no address.";
        hasError = true;
      }

      // Password requirements
      if (password.length < 8) {
        if (passwordError)
          passwordError.textContent = "Password must be at least 8 characters.";
        hasError = true;
      }
      // Add more requirements as needed (e.g., uppercase, number, etc.)

      // Confirm password
      if (password !== confirmPassword) {
        if (passwordConfirmError)
          passwordConfirmError.textContent = "Passwords do not match.";
        hasError = true;
      }

      if (hasError) return;

      try {
        const result = await registerUser({ name, email, password });
        if (result.errors) {
          if (formError)
            formError.textContent =
              result.errors[0]?.message || "Registration failed.";
        } else {
          // Redirect to login with success message
          localStorage.setItem(
            "registerSuccess",
            "Account created! You can now log in."
          );
          history.pushState({ path: "/login" }, "", "/login");
          window.location.reload();
        }
      } catch (err) {
        if (formError)
          formError.textContent = "Registration failed. Please try again.";
      }
    });
  }
}

export default async function RegisterPage() {
  const html = `
    <main class="flex justify-center items-center min-h-[80vh] mt-20 px-4">
      <section class="bg-gray-100 text-blue-900 rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 class="text-center text-[#2c3e50] text-2xl font-semibold mb-8">Create an Account</h2>
        <form class="flex flex-col gap-6" id="register-form">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="@stud.noroff.no"
              required
              class="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-400"
            />
            <p class="text-red-500 text-sm" id="email-error"></p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="font-medium text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              class="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-400"
            />
            <p class="text-red-500 text-sm" id="password-error"></p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="confirmPassword" class="font-medium text-gray-800">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              class="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-400"
            />
            <p class="text-red-500 text-sm" id="password-confirm-error"></p>
          </div>
          <button
            type="submit"
            class="bg-[#3498db] hover:bg-[#2c3e50] text-white font-medium py-2 rounded transition-colors"
          >
            Register
          </button>
          <p class="text-red-500 text-sm text-center" id="form-register-error"></p>
        </form>
        <p class="text-center mt-4 text-gray-700">
          Already have an account? 
          <a href="/login" class="text-[#3498db] font-medium hover:underline">Login here</a>
        </p>
      </section>
    </main>
  `;
  setTimeout(setupRegisterFormValidation, 0);
  return html;
}
