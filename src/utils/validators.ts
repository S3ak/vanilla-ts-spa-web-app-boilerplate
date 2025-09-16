import { ValidationError } from "../services/error/error";

function registerUser(username: string, password: string) {
  if (username.length < 3) {
    throw new ValidationError(
      "Username must be at least three characters long."
    );
  }

  if (password.length < 8) {
    throw new ValidationError(
      "Password must be at least eight characters long."
    );
  }

  console.info("User registered successfully.");
}

try {
  registerUser("my", "mypassword123");
} catch (error: unknown) {
  if (error instanceof ValidationError) {
    alert(error.message);
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    alert(
      `An unexpected error occurred: ${(error as { message?: string }).message}`
    );
  } else {
    alert("An unexpected error occurred.");
  }
}
