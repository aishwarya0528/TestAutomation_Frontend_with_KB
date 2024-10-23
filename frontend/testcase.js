import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1 Test if the login form renders correctly
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// 5.2 Test if the form submits with valid input
test('submits form with valid email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  // Add assertions for successful submission
});

// 5.3 Test if error message appears for empty fields
test('displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.4 Test if error message clears after successful submission
test('removes error message after successful submission', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.5 Test if form fields clear after successful submission
test('clears form fields after successful submission', () => {
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

// 5.6 Test if the login button is disabled when fields are empty
test('login button is disabled when fields are empty', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  expect(submitButton).toBeDisabled();
});

// 5.7 Test if the login button is enabled when both fields have input
test('login button is enabled when both fields have input', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(submitButton).toBeEnabled();
});

// 5.8 Test if error message appears for invalid email format
test('displays error message for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);
  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

// 5.9 Test if password input is masked
test('password input is masked', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toHaveAttribute('type', 'password');
});

// 5.10 Test if form submission is prevented on invalid input
test('prevents form submission on invalid input', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);
  // Add assertions to check that form submission was prevented
});
