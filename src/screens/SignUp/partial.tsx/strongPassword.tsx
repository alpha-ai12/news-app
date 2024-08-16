export const isStrongPassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+[\]{};:'"\\|,.<>/?-]/;

  if (!uppercaseRegex.test(password)) {
    return "Password must have at least 1 uppercase characters";
  } else if (!lowercaseRegex.test(password)) {
    return "Password must have at least 1 lowercase characters";
  } else if (!specialCharRegex.test(password)) {
    return "Password must have at least 1 special characters";
  } else if (!digitRegex.test(password)) {
    return "Password must have at least 1 number";
  } else {
    return false;
  }
};
