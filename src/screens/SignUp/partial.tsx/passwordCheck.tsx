export const checkPassword = (password) => {
  const lengthRegex = /.{6,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+[\]{};:'"\\|,.<>/?-]/;

  const isLengthValid = lengthRegex.test(password);
  const isUppercaseValid = uppercaseRegex.test(password);
  const isLowercaseValid = lowercaseRegex.test(password);
  const isDigitValid = digitRegex.test(password);
  const isSpecialCharValid = specialCharRegex.test(password);

  if (
    isLengthValid &&
    isUppercaseValid &&
    isLowercaseValid &&
    isDigitValid &&
    isSpecialCharValid
  ) {
    return "Strong";
  } else if (
    (isLengthValid && isUppercaseValid && isLowercaseValid && isDigitValid) ||
    (isLengthValid &&
      isUppercaseValid &&
      isLowercaseValid &&
      isSpecialCharValid) ||
    (isLengthValid && isUppercaseValid && isDigitValid && isSpecialCharValid) ||
    (isLengthValid && isLowercaseValid && isDigitValid && isSpecialCharValid)
  ) {
    return "Good";
  } else {
    return "Poor";
  }
};
