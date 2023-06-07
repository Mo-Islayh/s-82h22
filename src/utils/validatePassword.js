export const validatePassword = (password) => {
  // Regular expressions for each requirement
  const uppercaseRegex = /[A-Z]/
  const numberRegex = /[0-9]/
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

  // Check if password meets all requirements
  const hasUppercase = uppercaseRegex.test(password)
  const hasNumber = numberRegex.test(password)
  const hasSpecialChar = specialCharRegex.test(password)

  // Return true if all requirements are met, false otherwise
  return hasUppercase && hasNumber && hasSpecialChar
}
