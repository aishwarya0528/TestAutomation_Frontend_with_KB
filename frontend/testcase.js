import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1
test('renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// 5.2
test('displays error message when submitting empty form', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.3
test('clears form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.4
test('logs email and password to console on form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  
  userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  consoleSpy.mockRestore();
});

// 5.5
test('displays error for invalid email format', () => {
  render(<Login />);
  
  userEvent.type(screen.getByLabelText(/email/i), 'invalidemail');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.6
test('clears error message after successful submission', () => {
  render(<Login />);
  
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  
  userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.7
test('prevents default form submission', () => {
  const preventDefaultMock = jest.fn();
  render(<Login />);
  
  const form = screen.getByRole('form');
  fireEvent.submit(form, { preventDefault: preventDefaultMock });
  
  expect(preventDefaultMock).toHaveBeenCalled();
});

// 5.8
test('displays loading state during form submission', () => {
  render(<Login />);
  
  userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

// 5.9
test('handles network error during login', async () => {
  render(<Login />);
  
  userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await screen.findByText('Network error. Please try again.');
});

// 5.10
test('redirects to dashboard after successful login', async () => {
  render(<Login />);
  
  userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  userEvent.type(screen.getByLabelText(/password/i), 'password123');
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await screen.findByText('Welcome to your dashboard!');
});
