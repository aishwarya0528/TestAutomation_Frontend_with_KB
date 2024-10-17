Here are the 10 test cases based on sections 5.1 to 5.10 of the knowledge base:

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
test('displays error message when submitting partial form', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(submitButton);

  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.5
test('submits form and resets fields on successful login', () => {
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

// 5.6
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
  consoleSpy.mockRestore();
});

// 5.7
test('displays error message for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.8
test('displays error message for short password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);

  expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();
});

// 5.9
test('displays error message for invalid credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'wrong@example.com');
  userEvent.type(passwordInput, 'wrongpassword');
  fireEvent.click(submitButton);

  expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
});

// 5.10
test('clears error message on successful login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});
```