Here are the Jest test cases for the Login component:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('allows input in email and password fields', () => {
  render(<Login />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('displays error message when fields are empty', () => {
  render(<Login />);
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('displays error message when only email is provided', () => {
  render(<Login />);
  userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('displays error message when only password is provided', () => {
  render(<Login />);
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('clears form and error message on successful submission', () => {
  render(<Login />);
  userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
  expect(screen.getByLabelText(/password/i)).toHaveValue('');
});

test('logs email and password to console on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

test('form is accessible via keyboard navigation', () => {
  render(<Login />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  emailInput.focus();
  expect(document.activeElement).toBe(emailInput);

  userEvent.tab();
  expect(document.activeElement).toBe(passwordInput);

  userEvent.tab();
  expect(document.activeElement).toBe(loginButton);
});
```