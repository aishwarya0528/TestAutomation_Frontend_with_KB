
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1 Test case for rendering login form
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

// 5.2 Test case for successful login
test('submits form with valid email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.3 Test case for empty form submission
test('displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.4 Test case for invalid email format
test('displays error message for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

// 5.5 Test case for password length validation
test('displays error message for password less than 8 characters', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);
  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

// 5.6 Test case for clearing error message
test('clears error message when filling out form after error', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password:'), 'password123');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.7 Test case for login button presence
test('renders login button', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

// 5.8 Test case for form reset after submission
test('resets form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.9 Test case for login header
test('displays login header', () => {
  render(<Login />);
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
});

// 5.10 Test case for error message styling
test('applies error message styling', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  const errorMessage = screen.getByText('Please fill in all fields');
  expect(errorMessage).toHaveClass('error-message');
});
