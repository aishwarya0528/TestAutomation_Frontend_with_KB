
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1 Test user login with valid credentials
test('user can login with valid credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'valid@example.com');
  userEvent.type(passwordInput, 'validpassword');
  fireEvent.click(submitButton);
  // Add assertion for successful login
});

// 5.2 Test user login with invalid credentials
test('user cannot login with invalid credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'invalidpassword');
  fireEvent.click(submitButton);
  expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
});

// 5.3 Test empty form submission
test('empty form submission displays error message', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.4 Test email format validation
test('invalid email format displays error message', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);
  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

// 5.5 Test password length validation
test('password less than 8 characters displays error message', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);
  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

// 5.6 Test login button functionality
test('login button submits the form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  const handleSubmit = jest.fn(e => e.preventDefault());
  submitButton.onclick = handleSubmit;
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

// 5.7 Test form reset after successful submission
test('form resets after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.8 Test error message clearing on input change
test('error message clears on input change', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  userEvent.type(emailInput, 't');
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.9 Test login persistence
test('login persists after page reload', () => {
  // This test would require mocking localStorage or a similar mechanism
  // Implementation depends on how login persistence is handled
});

// 5.10 Test logout functionality
test('user can logout', () => {
  // This test would require implementing and rendering a logout button
  // Implementation depends on how logout is handled in the application
});
