import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// Modified as per comments.txt
test('TC001: Validate login form submission with valid inputs', async () => {
  const user = userEvent.setup();
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveValue('');
  expect(screen.getByLabelText(/password/i)).toHaveValue('');
});

test('TC002: Validate form field validation for empty inputs', async () => {
  const user = userEvent.setup();
  render(<Login />);

  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('TC003: Validate error message for empty fields', async () => {
  const user = userEvent.setup();
  render(<Login />);

  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('TC004: Validate email input field', async () => {
  const user = userEvent.setup();
  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);
  await user.type(emailInput, 'test@example.com');

  expect(emailInput).toHaveValue('test@example.com');
});

test('TC005: Validate password input field', async () => {
  const user = userEvent.setup();
  render(<Login />);

  const passwordInput = screen.getByLabelText(/password/i);
  await user.type(passwordInput, 'password123');

  expect(passwordInput).toHaveValue('password123');
});

test('TC006: Validate error message clearing after successful submission', async () => {
  const user = userEvent.setup();
  render(<Login />);

  await user.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
});

// Modified as per comments.txt
test('TC007: Validate login with short password', async () => {
  const user = userEvent.setup();
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), '123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', '123');
  expect(screen.queryByText(/password must be at least 6 characters long/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveValue('');
  expect(screen.getByLabelText(/password/i)).toHaveValue('');
});

// Modified as per comments.txt
test('TC008: Validate form accessibility', () => {
  render(<Login />);
  
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

// Modified as per comments.txt
test('TC009: Validate form layout and styling', () => {
  render(<Login />);
  
  const formElement = screen.getByRole('form');
  expect(formElement).toHaveClass('login-form');
  
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  
  expect(emailInput).toBeVisible();
  expect(passwordInput).toBeVisible();
  expect(loginButton).toBeVisible();
  expect(loginButton).toHaveClass('login-button');
});
