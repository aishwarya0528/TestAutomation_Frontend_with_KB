import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('5.1 Render Input Fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('5.2 Allow Input in Fields', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('5.3 Form Validation', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

test('5.4 Error Message Display', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('5.5 Successful Form Submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('5.6 Invalid Credentials', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'wrongpassword');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
});

test('5.7 Password Visibility Toggle', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
  
  expect(passwordInput).toHaveAttribute('type', 'password');
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute('type', 'text');
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('5.8 Remember Me Functionality', () => {
  render(<Login />);
  const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
  
  expect(rememberMeCheckbox).not.toBeChecked();
  fireEvent.click(rememberMeCheckbox);
  expect(rememberMeCheckbox).toBeChecked();
});

test('5.9 Forgot Password Link', () => {
  render(<Login />);
  const forgotPasswordLink = screen.getByText(/forgot password/i);
  
  expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
});

test('5.10 Social Media Login Options', () => {
  render(<Login />);
  const googleLoginButton = screen.getByRole('button', { name: /login with google/i });
  const facebookLoginButton = screen.getByRole('button', { name: /login with facebook/i });
  
  expect(googleLoginButton).toBeInTheDocument();
  expect(facebookLoginButton).toBeInTheDocument();
});
