import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('allows input in email and password fields', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('displays error message when fields are empty', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('displays error message when only email is provided', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('displays error message when only password is provided', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('clears form and error message on successful submission', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveValue('');
  expect(screen.getByLabelText(/password/i)).toHaveValue('');
});

test('logs email and password to console on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});