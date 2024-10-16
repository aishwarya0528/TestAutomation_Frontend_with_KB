import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('displays error message when form is submitted with empty fields', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('clears form fields and error message after successful submission', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByLabelText(/email/i)).toHaveValue('');
  expect(screen.getByLabelText(/password/i)).toHaveValue('');
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

test('logs email and password to console on form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

test('updates email input value on change', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput).toHaveValue('test@example.com');
});

test('updates password input value on change', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(passwordInput).toHaveValue('password123');
});