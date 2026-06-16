# Modern Registration Form with Live Validation

A sleek, modern, and secure **Account Creation Form** built using semantic HTML5, pure CSS3 variables, and vanilla JavaScript. This project features dynamic client-side validation using regular expressions, an asynchronous real-time password strength checker, and physical-tactile button states.

##  Live Demo

Check out the live application here: **[Live Demo Link](https://mathewjebis.github.io/Form-Validation/)**

##  Features

###  Custom Validation Rules

- **Full Name**: Forces an explicit `"Firstname Lastname"` pattern using regex validation.
- **Email Address**: Restricts inputs to valid standard email formatting syntaxes.
- **Password Constraints**: Requires a standard character limit boundary between 6 and 20 characters long.
- **Cross-Field Equality**: Real-time evaluation checks to confirm password matching.

###  Smart Password Strength Meter

Evaluates passwords dynamically across a 5-tier complexity framework (Length checks, Capital letters, Numerical additions, and Special symbols):

-  **Weak (≤1 point)**: Generates a 25% width indicator filled with `#e74c3c` crimson red.
-  **Medium (2-3 points)**: Generates a 60% width indicator filled with `#f39c12` flat orange.
-  **Strong (≥4 points)**: Generates a 100% width indicator filled with `#4caf50` emerald green.

###  Premium UI/UX Details

- **Mesh Background**: Wrapped completely over a premium modern dark multi-stop linear gradient.
- **Asynchronous Form Blur Events**: Triggers individual element evaluations instantly when fields lose user focus (`blur`), preventing disruptive error spam while typing.
- **Visibility Toggles**: Smooth multi-type inline absolute action links toggle values instantly from hidden passwords to visible plain strings.
- **Auto-Dismiss Banner**: Displays an informative personalized success banner that resets your DOM node architecture and automatically dismisses itself after 4 seconds.
- **Mobile Responsive Layout**: Features robust element scaling logic using media rules tailored down to `480px` screen widths.

##  Project Structure

```text
├── index.html          # Semantic layout structures and DOM boundaries
├── index.css           # Modern CSS transitions, gradients, and custom themes
└── index.js            # Validation algorithms, Event Listeners, and UI mechanics
```

##  Setup & Installation

To run this project locally, simply follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mathewjebis/Form-Validation.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd your-repository-name
   ```

3. **Open the project:**
   - Double-click `index.html` to execute directly inside your preferred modern web browser.
   - Alternatively, right-click and use the **Live Server** extension in VS Code for real-time live-reloading code changes.
