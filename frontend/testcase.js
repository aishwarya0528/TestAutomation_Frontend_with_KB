Here are the 10 test cases as requested, corresponding to sections 5.1 through 5.10:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

// 5.1
test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// 5.2
test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});

// 5.3
test('displays error message when submitting empty form', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

// 5.4
test('clears form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});

// 5.5
test('removes error message after successful submission', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
});

// 5.6
test('prevents default form submission', () => {
  render(<Login />);
  const form = screen.getByRole('form');
  const mockSubmit = jest.fn(e => e.preventDefault());
  form.onsubmit = mockSubmit;
  fireEvent.submit(form);
  expect(mockSubmit).toHaveBeenCalled();
});

// 5.7
test('logs email and password to console on submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  consoleSpy.mockRestore();
});

// 5.8
test('fails when trying to submit with only email', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

// 5.9
test('fails when trying to submit with only password', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

// 5.10
test('fails when submitting invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
});
```