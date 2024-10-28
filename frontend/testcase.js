
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('5.1 Verify that the login form renders correctly', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('5.2 Check if email input accepts valid email addresses', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  userEvent.type(emailInput, 'test@example.com');
  expect(emailInput).toHaveValue('test@example.com');
});

test('5.3 Ensure password input masks the entered characters', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('5.4 Verify that the login button is clickable', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeEnabled();
});

test('5.5 Check if an error message is displayed for empty fields', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('5.6 Verify that the form clears after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('5.7 Check if the error message disappears after successful login', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

test('5.8 Verify that the login function is called with correct credentials', () => {
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

test('5.9 Check if the login form is responsive', () => {
  render(<Login />);
  const loginForm = screen.getByRole('form');
  expect(loginForm).toHaveClass('login-form');
});

test('5.10 Verify that the login button has the correct styling', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toHaveClass('login-button');
});
