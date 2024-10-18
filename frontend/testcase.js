Based on the provided requirements, here are the 10 test cases specifically mentioned in the 'integrationWthConfluence' knowledge base for the Login.js component:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('5.1 Renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

test('5.2 Allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});

test('5.3 Displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('5.4 Clears form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});

test('5.5 Removes error message after successful submission', () => {
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

test('5.6 Prevents default form submission', () => {
  const { container } = render(<Login />);
  const form = container.querySelector('form');
  const submitEvent = new Event('submit');
  const preventDefault = jest.fn();
  submitEvent.preventDefault = preventDefault;
  form.dispatchEvent(submitEvent);
  expect(preventDefault).toHaveBeenCalled();
});

test('5.7 Logs email and password to console on successful submission', () => {
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

test('5.8 Displays error for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

test('5.9 Displays error for weak password', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(passwordInput, 'weak');
  fireEvent.click(submitButton);
  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

test('5.10 Disables submit button while processing', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
  expect(submitButton).toHaveTextContent('Processing...');
});
```

These 10 test cases correspond exactly to sections 5.1 through 5.10 mentioned in the 'integrationWthConfluence' knowledge base, as requested.