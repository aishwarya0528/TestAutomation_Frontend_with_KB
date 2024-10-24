import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1 Test email input validation
test('validates email input', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  userEvent.type(emailInput, 'invalid-email');
  fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.2 Test password strength indicator
test('displays password strength indicator', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(passwordInput, 'weak');
  expect(screen.getByText('Password strength: Weak')).toBeInTheDocument();
  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, 'StrongP@ssw0rd');
  expect(screen.getByText('Password strength: Strong')).toBeInTheDocument();
});

// 5.3 Test login button disabled state
test('disables login button when fields are empty', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeDisabled();
  userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password:'), 'password');
  expect(loginButton).toBeEnabled();
});

// 5.4 Test error message display
test('displays error message for invalid credentials', async () => {
  render(<Login />);
  userEvent.type(screen.getByLabelText('Email:'), 'invalid@example.com');
  userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword');
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
});

// 5.5 Test successful login flow
test('redirects to dashboard on successful login', async () => {
  const mockNavigate = jest.fn();
  render(<Login navigate={mockNavigate} />);
  userEvent.type(screen.getByLabelText('Email:'), 'valid@example.com');
  userEvent.type(screen.getByLabelText('Password:'), 'correctpassword');
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
});

// 5.6 Test remember me functionality
test('remembers user email when "Remember Me" is checked', () => {
  render(<Login />);
  const rememberMeCheckbox = screen.getByLabelText('Remember Me');
  const emailInput = screen.getByLabelText('Email:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.click(rememberMeCheckbox);
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  expect(localStorage.getItem('rememberedEmail')).toBe('test@example.com');
});

// 5.7 Test forgot password link
test('navigates to forgot password page', () => {
  const mockNavigate = jest.fn();
  render(<Login navigate={mockNavigate} />);
  fireEvent.click(screen.getByText('Forgot Password?'));
  expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
});

// 5.8 Test form submission prevention
test('prevents default form submission', () => {
  const preventDefault = jest.fn();
  render(<Login />);
  const form = screen.getByRole('form');
  fireEvent.submit(form, { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
});

// 5.9 Test loading state during login
test('displays loading state during login process', async () => {
  render(<Login />);
  userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password:'), 'password');
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  expect(screen.getByText('Logging in...')).toBeInTheDocument();
  await screen.findByText('Login successful');
});

// 5.10 Test accessibility
test('login form is accessible', () => {
  const { container } = render(<Login />);
  expect(container).toBeAccessible();
});
