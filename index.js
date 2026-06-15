// Regex patterns
const patterns = {
  userName: /^[A-Za-z]+ [A-Za-z]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Get elements
const form = document.getElementById("form-validate");
const successBanner = document.getElementById("success-banner");
const successMessage = document.getElementById("success-message");

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

// Real-time password strength
document.getElementById("password").addEventListener("input", function () {
  checkPasswordStrength(this.value);
});

// Validate form on submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = document.getElementById("userName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  let isValid = true;

  // Validate username
  if (userName === "") {
    showError("uName-error", "Full name is required", "userName");
    isValid = false;
  } else if (!patterns.userName.test(userName)) {
    showError(
      "uName-error",
      "Enter first and last name (e.g. John Doe)",
      "userName",
    );
    isValid = false;
  } else {
    clearError("uName-error", "userName");
  }

  // Validate email
  if (email === "") {
    showError("mail-error", "Email address is required", "email");
    isValid = false;
  } else if (!patterns.email.test(email)) {
    showError("mail-error", "Enter a valid email address", "email");
    isValid = false;
  } else {
    clearError("mail-error", "email");
  }

  // Validate password
  if (password === "") {
    showError("password-error", "Password is required", "password");
    isValid = false;
  } else if (password.length < 6) {
    showError(
      "password-error",
      "Password must be at least 6 characters",
      "password",
    );
    isValid = false;
  } else if (password.length > 20) {
    showError(
      "password-error",
      "Password must not exceed 20 characters",
      "password",
    );
    isValid = false;
  } else {
    clearError("password-error", "password");
  }

  // Validate confirm password
  if (confirmPassword === "") {
    showError(
      "cPassword-error",
      "Please confirm your password",
      "confirmPassword",
    );
    isValid = false;
  } else if (confirmPassword !== password) {
    showError("cPassword-error", "Passwords do not match", "confirmPassword");
    isValid = false;
  } else {
    clearError("cPassword-error", "confirmPassword");
  }

  // Success
  if (isValid) {
    successMessage.textContent =
      "Welcome " + userName + "! Account created successfully!";
    successBanner.classList.add("show");
    form.reset();
    // Reset input states
    document.querySelectorAll("input").forEach((input) => {
      input.classList.remove("valid", "invalid");
    });
    document.getElementById("password-strength").classList.remove("show");
    // Hide success after 4 seconds
    setTimeout(() => {
      successBanner.classList.remove("show");
    }, 4000);
  }
});

// Real-time validation on blur
document.getElementById("userName").addEventListener("blur", function () {
  let value = this.value.trim();
  if (value === "") {
    showError("uName-error", "Full name is required", "userName");
  } else if (!patterns.userName.test(value)) {
    showError(
      "uName-error",
      "Enter first and last name (e.g. John Doe)",
      "userName",
    );
  } else {
    clearError("uName-error", "userName");
  }
});

document.getElementById("email").addEventListener("blur", function () {
  let value = this.value.trim();
  if (value === "") {
    showError("mail-error", "Email address is required", "email");
  } else if (!patterns.email.test(value)) {
    showError("mail-error", "Enter a valid email address", "email");
  } else {
    clearError("mail-error", "email");
  }
});
