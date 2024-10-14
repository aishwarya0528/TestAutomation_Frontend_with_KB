import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByTestId('login-form')).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('submits form with valid inputs', () => {
  console.log = jest.fn();
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(console.log).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

test('displays error for empty fields', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields');
});

test('updates email and password state', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
  expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
});

test('has proper accessibility attributes', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-describedby', 'email-error');
  expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-describedby', 'password-error');
});

test('clears error message on valid submission', () => {
  console.log = jest.fn();
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByRole('alert')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('handles maximum length inputs', () => {
  console.log = jest.fn();
  render(<Login />);
  const longEmail = 'a'.repeat(254) + '@example.com';
  const longPassword = 'a'.repeat(100);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: longEmail } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: longPassword } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(console.log).toHaveBeenCalledWith('Email:', longEmail, 'Password:', longPassword);
});

test('submits form with Enter key', () => {
  console.log = jest.fn();
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.keyPress(screen.getByLabelText(/password/i), { key: 'Enter', code: 13, charCode: 13 });
  expect(console.log).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

test('renders without unnecessary re-renders', () => {
  const { rerender } = render(<Login />);
  const renderCount = jest.fn();
  React.useEffect(renderCount, []);
  rerender(<Login />);
  expect(renderCount).toHaveBeenCalledTimes(1);
});

test('handles successful authentication', async () => {
  const mockAuth = jest.fn(() => Promise.resolve({ success: true }));
  render(<Login authService={mockAuth} />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => expect(mockAuth).toHaveBeenCalledWith('test@example.com', 'password123'));
  expect(screen.getByText(/login successful/i)).toBeInTheDocument();
});
