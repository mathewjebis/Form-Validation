# Registration Form with Live Validation

A registration form built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. Focused on real client-side validation: regex-based rules, a password strength meter, and validation that runs consistently across every field, not just on submit.

## Live Demo

[View Live Demo](https://mathewjebis.github.io/Form-Validation/)

## Features

### Validation Rules

- **Full Name**: must match a `Firstname Lastname` pattern (two words, letters only)
- **Email**: validated against a standard email regex
- **Password**: 6–20 characters
- **Confirm Password**: must match the password — checked live as you type, not just on submit (if you fill in Confirm Password first and then go back and edit the original password, the match check updates immediately)
- All four fields validate consistently: as you leave each field (`blur`), and again on submit

### Password Strength Meter

A simple 5-point scoring system (length ≥ 6, length ≥ 10, uppercase letter, number, special character) maps to three visual states:

- **Weak** (≤1 point): red, 25% bar
- **Medium** (2–3 points): orange, 60% bar
- **Strong** (≥4 points): green, 100% bar

### UI Details

- Show/Hide toggle on both password fields (single delegated click listener, not a handler per button)
- Success banner on valid submission, auto-dismisses after 4 seconds
- Submit button briefly disables during "submission" to prevent double-submit
- Error messages use `aria-live="polite"` so screen readers announce validation errors as they appear
- Responsive down to 480px screens

## Notes on scope

- This is a front-end-only demo — there's no backend, so "Create Account" doesn't actually create anything. It's here to demonstrate validation logic and UX patterns.
- Passwords are intentionally **not** trimmed of leading/trailing whitespace — trimming would silently change what the user typed, which isn't appropriate for a password field.

## Project Structure

```
├── index.html   # Form markup
├── index.css    # Styling, validation states, responsive layout
└── index.js     # Validation logic, password strength, event handling
```

## Getting Started

No build step required — open `index.html` directly in a browser, or serve it locally:

```bash
git clone https://github.com/mathewjebis/Form-Validation.git
cd Form-Validation
npx serve .
```

## Author

**S. Mathew Jebis**

- GitHub: [mathewjebis](https://github.com/mathewjebis)
