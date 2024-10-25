
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// Test case 5.1
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// Test case 5.2
test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

// Test case 5.3
test('displays error message for empty fields', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// Test case 5.4
test('clears form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// Test case 5.5
test('removes error message after successful submission', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// Test case 5.6
test('login button is disabled when fields are empty', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeDisabled();
});

// Test case 5.7
test('console logs email and password on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

// Test case 5.8
test('displays custom error message for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(loginButton);
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// Test case 5.9
test('displays custom error message for short password', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(passwordInput, 'short');
  fireEvent.click(loginButton);
  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

// Test case 5.10
test('disables login button during form submission', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);
  expect(loginButton).toBeDisabled();
  await screen.findByText('Login successful');
  expect(loginButton).toBeEnabled();
});
