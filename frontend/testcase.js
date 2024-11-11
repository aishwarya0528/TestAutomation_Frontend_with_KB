import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('displays error for empty form submission', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('displays error for email-only submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('displays error for password-only submission', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('submits form with valid inputs and resets form', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'valid@email.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('logs successful login attempt', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'valid@email.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(consoleSpy).toHaveBeenCalledWith('Email: valid@email.com Password: password123');
});

test('displays error for invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
});

test('accepts short password (no minimum length validation)', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, '123');
  fireEvent.click(submitButton);
  
  expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
});

test('clears error messages when input is corrected', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  
  userEvent.clear(emailInput);
  userEvent.type(emailInput, 'valid@email.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
});