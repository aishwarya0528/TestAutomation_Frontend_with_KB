import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('5.1: Renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

test('5.2: Displays error message for empty fields', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('5.3: Allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('5.4: Clears input fields after successful submission', () => {
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

test('5.5: Prevents default form submission', () => {
  const mockPreventDefault = jest.fn();
  render(<Login />);
  const form = screen.getByRole('form');
  fireEvent.submit(form, { preventDefault: mockPreventDefault });
  expect(mockPreventDefault).toHaveBeenCalled();
});

test('5.6: Logs email and password to console on successful submission', () => {
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

test('5.7: Clears error message after successful submission', () => {
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

test('5.8: Displays login button', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('5.9: Renders login form with correct structure', () => {
  render(<Login />);
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(screen.getByRole('form')).toHaveClass('login-form');
});

test('5.10: Displays placeholder text in input fields', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
});
