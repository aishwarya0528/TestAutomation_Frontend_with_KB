import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('displays error for empty form submission', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.click(submitButton);

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('displays error for email-only submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(submitButton);

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('displays error for password-only submission', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('submits form with valid inputs', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('logs form data on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
  consoleSpy.mockRestore();
});

test('displays error for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'invalid-email');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
});

test('accepts short password without length validation', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, '123');
  fireEvent.click(submitButton);

  expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: 123');
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
  expect(screen.queryByText(/password must be at least/i)).not.toBeInTheDocument();

  consoleSpy.mockRestore();
});

test('displays error for invalid credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'wrongpassword');
  fireEvent.click(submitButton);

  expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
});