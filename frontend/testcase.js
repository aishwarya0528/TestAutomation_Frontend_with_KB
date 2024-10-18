import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('5.1 Verify login form renders correctly', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('5.2 Test email input field', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  userEvent.type(emailInput, 'test@example.com');
  expect(emailInput).toHaveValue('test@example.com');
});

test('5.3 Test password input field', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(passwordInput, 'password123');
  expect(passwordInput).toHaveValue('password123');
});

test('5.4 Verify error message for empty fields', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('5.5 Test successful form submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

test('5.6 Verify form prevents default submission', () => {
  const preventDefault = jest.fn();
  render(<Login />);
  const form = screen.getByRole('form');

  fireEvent.submit(form, { preventDefault });

  expect(preventDefault).toHaveBeenCalled();
});

test('5.7 Check if entered data is logged to console', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  consoleSpy.mockRestore();
});

test('5.8 Verify error clearing after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

test('5.9 Test login button is disabled when fields are empty', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeDisabled();

  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');

  expect(loginButton).toBeEnabled();
});

test('5.10 Verify login form accessibility', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  expect(emailInput).toHaveAttribute('type', 'email');
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute('type', 'submit');
});
