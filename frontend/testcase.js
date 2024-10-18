
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1 Test rendering of login form
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// 5.2 Test empty form submission
test('displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.3 Test valid email format
test('validates email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.blur(emailInput);
  
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.4 Test password length requirement
test('validates password length', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(passwordInput, 'short');
  fireEvent.blur(passwordInput);
  
  expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();
});

// 5.5 Test successful login
test('handles successful login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'valid@example.com');
  userEvent.type(passwordInput, 'validpassword');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Login successful')).toBeInTheDocument();
});

// 5.6 Test error handling for invalid credentials
test('displays error message for invalid credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'wrongpassword');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
});

// 5.7 Test form reset after submission
test('resets form after successful login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'valid@example.com');
  userEvent.type(passwordInput, 'validpassword');
  fireEvent.click(submitButton);
  
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.8 Test accessibility features
test('ensures form is accessible', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  expect(emailInput).toHaveAttribute('aria-label', 'Email');
  expect(passwordInput).toHaveAttribute('aria-label', 'Password');
  expect(submitButton).toHaveAttribute('type', 'submit');
});

// 5.9 Test responsive design
test('login form is responsive', () => {
  const { container } = render(<Login />);
  
  expect(container.firstChild).toHaveStyle('max-width: 400px');
  expect(container.firstChild).toHaveStyle('margin: 0 auto');
});

// 5.10 Test performance
test('renders login form without delay', () => {
  const startTime = performance.now();
  render(<Login />);
  const endTime = performance.now();
  
  expect(endTime - startTime).toBeLessThan(100); // Assuming 100ms is an acceptable render time
});
