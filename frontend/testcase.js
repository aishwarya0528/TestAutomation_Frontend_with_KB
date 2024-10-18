Based on the provided Login.js component and the test cases specified in the knowledge base, here are the 10 test cases corresponding to sections 5.1 through 5.10:

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
test('does not show error message initially', () => {
  render(<Login />);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.6
test('clears error message after successful submission', () => {
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
  consoleSpy.mockRestore();
});

// 5.8
test('submits form with invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'invalid-email');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.9
test('submits form with password less than 8 characters', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

// 5.10
test('displays network error message on submission failure', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  await screen.findByText('Network error. Please try again later.');
  expect(screen.getByText('Network error. Please try again later.')).toBeInTheDocument();
});
```

These 10 test cases correspond exactly to sections 5.1 through 5.10 of the knowledge base, as requested.