Here are the 10 test cases based on sections 5.1 to 5.10:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

// 5.2
test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

// 5.3
test('displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.4
test('clears form fields after successful submission', () => {
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

// 5.5
test('removes error message after successful submission', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.6
test('prevents default form submission', () => {
  const preventDefault = jest.fn();
  render(<Login />);
  const form = screen.getByRole('form');
  fireEvent.submit(form, { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
});

// 5.7
test('logs email and password to console on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

// 5.8
test('displays custom error message for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'invalid-email');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.9
test('shows password strength indicator', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(passwordInput, 'weak');
  expect(screen.getByText('Password strength: Weak')).toBeInTheDocument();
  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, 'strongpassword123');
  expect(screen.getByText('Password strength: Strong')).toBeInTheDocument();
});

// 5.10
test('disables submit button when form is invalid', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  expect(submitButton).toBeDisabled();
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(submitButton).toBeEnabled();
});
```