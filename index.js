// Regex patterns
const patterns = {
  userName: /^[A-Za-z]+ [A-Za-z]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Get elements
const form = document.getElementById("form-validate");
const successBanner = document.getElementById("success-banner");
const successMessage = document.getElementById("success-message");
const submitBtn = document.getElementById("submit-btn");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Show error message
function showError(errorId, message, inputId) {
  document.getElementById(errorId).textContent = message;
  if (inputId) {
    let input = document.getElementById(inputId);
    input.classList.add("invalid");
    input.classList.remove("valid");
  }
}

// Clear error message
function clearError(errorId, inputId) {
  document.getElementById(errorId).textContent = "";
  if (inputId) {
    let input = document.getElementById(inputId);
    input.classList.add("valid");
    input.classList.remove("invalid");
  }
}

// Toggle password visibility
function togglePassword(inputId, btn) {
  let input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "Hide";
  } else {
    input.type = "password";
    btn.textContent = "Show";
  }
}

// Single delegated listener for both "Show/Hide" buttons instead of
// an inline onclick on each one.
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    togglePassword(btn.dataset.target, btn);
  });
});

// Password strength checker
function checkPasswordStrength(password) {
  let strengthFill = document.getElementById("strength-fill");
  let strengthText = document.getElementById("strength-text");
  let strengthContainer = document.getElementById("password-strength");

  if (password.length === 0) {
    strengthContainer.classList.remove("show");
    return;
  }

  strengthContainer.classList.add("show");

  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) {
    strengthFill.style.width = "25%";
    strengthFill.style.background = "#e74c3c";
    strengthText.textContent = "Weak";
    strengthText.style.color = "#e74c3c";
  } else if (strength <= 3) {
    strengthFill.style.width = "60%";
    strengthFill.style.background = "#f39c12";
    strengthText.textContent = "Medium";
    strengthText.style.color = "#f39c12";
  } else {
    strengthFill.style.width = "100%";
    strengthFill.style.background = "#4caf50";
    strengthText.textContent = "Strong";
    strengthText.style.color = "#4caf50";
  }
}

function validateUserName(value) {
  if (value === "") {
    showError("uName-error", "Full name is required", "userName");
    return false;
  } else if (!patterns.userName.test(value)) {
    showError(
      "uName-error",
      "Enter first and last name (e.g. John Doe)",
      "userName",
    );
    return false;
  }
  clearError("uName-error", "userName");
  return true;
}

function validateEmail(value) {
  if (value === "") {
    showError("mail-error", "Email address is required", "email");
    return false;
  } else if (!patterns.email.test(value)) {
    showError("mail-error", "Enter a valid email address", "email");
    return false;
  }
  clearError("mail-error", "email");
  return true;
}

function validatePassword(value) {
  // Not trimmed — a password's leading/trailing spaces are part of what
  // the user actually typed, and silently stripping them changes the
  // password without telling them.
  if (value === "") {
    showError("password-error", "Password is required", "password");
    return false;
  } else if (value.length < 6) {
    showError(
      "password-error",
      "Password must be at least 6 characters",
      "password",
    );
    return false;
  } else if (value.length > 20) {
    showError(
      "password-error",
      "Password must not exceed 20 characters",
      "password",
    );
    return false;
  }
  clearError("password-error", "password");
  return true;
}

function validateConfirmPassword(value, password) {
  if (value === "") {
    showError(
      "cPassword-error",
      "Please confirm your password",
      "confirmPassword",
    );
    return false;
  } else if (value !== password) {
    showError("cPassword-error", "Passwords do not match", "confirmPassword");
    return false;
  }
  clearError("cPassword-error", "confirmPassword");
  return true;
}

// Real-time password strength
passwordInput.addEventListener("input", function () {
  checkPasswordStrength(this.value);

  // Keep the confirm-password check live: if the user already typed a
  // confirmation, re-validate it as they edit the original password,
  // instead of only checking on submit.
  if (confirmPasswordInput.value !== "") {
    validateConfirmPassword(confirmPasswordInput.value, this.value);
  }
});

// Validate form on submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = document.getElementById("userName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  let isNameValid = validateUserName(userName);
  let isEmailValid = validateEmail(email);
  let isPasswordValid = validatePassword(password);
  let isConfirmValid = validateConfirmPassword(confirmPassword, password);

  let isValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;

  // Success
  if (isValid) {
    successMessage.textContent =
      "Welcome " + userName + "! Account created successfully!";
    successBanner.classList.add("show");

    // Briefly disable the submit button — gives real tactile feedback
    // (the .submit-btn:disabled style already existed but was never used)
    // and prevents an accidental double-submit.
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

    setTimeout(() => {
      form.reset();
      document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("valid", "invalid");
      });
      document.getElementById("password-strength").classList.remove("show");
      submitBtn.disabled = false;
      submitBtn.textContent = "Create Account";
    }, 600);

    // Hide success after 4 seconds
    setTimeout(() => {
      successBanner.classList.remove("show");
    }, 4000);
  }
});

// Real-time validation on blur — now consistent across all four fields,
// not just Name and Email.
document.getElementById("userName").addEventListener("blur", function () {
  validateUserName(this.value.trim());
});

document.getElementById("email").addEventListener("blur", function () {
  validateEmail(this.value.trim());
});

passwordInput.addEventListener("blur", function () {
  validatePassword(this.value);
});

confirmPasswordInput.addEventListener("blur", function () {
  validateConfirmPassword(this.value, passwordInput.value);
});
