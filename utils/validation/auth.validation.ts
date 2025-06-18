// utils/validation.ts
import { ValidationErrors } from '@/types/api/auth.types';

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate email format
 */
export function validateEmail(email: string): string | undefined {
  if (!email) {
    return 'Email is required';
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must contain uppercase, lowercase, number, and special character';
  }
  
  return undefined;
}

/**
 * Validate password confirmation
 */
export function validateConfirmPassword(
  password: string, 
  confirmPassword: string
): string | undefined {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return undefined;
}

/**
 * Validate full name
 */
export function validateFullName(fullName: string): string | undefined {
  if (!fullName) {
    return 'Full name is required';
  }
  
  const trimmedName = fullName.trim();
  
  if (trimmedName.length < 2) {
    return 'Full name must be at least 2 characters long';
  }
  
  if (trimmedName.length > 100) {
    return 'Full name must be less than 100 characters';
  }
  
  // Check for at least one letter
  if (!/[a-zA-Z]/.test(trimmedName)) {
    return 'Full name must contain at least one letter';
  }
  
  return undefined;
}


/**
 * Validate sign up form data
 */
export function validateSignUpForm(data: {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  
  // Validate each field
  const emailError = validateEmail(data.email);
  const passwordError = validatePassword(data.password);
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  const fullNameError = validateFullName(data.fullName);
  
  // Add errors to the errors object
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  if (fullNameError) errors.fullName = fullNameError;
  
  return errors;
}

/**
 * Validate sign in form data
 */
export function validateSignInForm(data: {
  email: string;
  password: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  
  // For sign in, we just check if fields are provided
  // We don't validate format strictly to avoid confusing users
  if (!data.email) {
    errors.email = 'Email is required';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
}

/**
 * Check if validation errors object has any errors
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Get first validation error message
 */
export function getFirstValidationError(errors: ValidationErrors): string | undefined {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) {
    return undefined;
  }
  
  return errors[errorKeys[0] as keyof ValidationErrors];
}