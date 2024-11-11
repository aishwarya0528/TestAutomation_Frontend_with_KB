import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('Input Field Rendering', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

test('Input Field Interaction', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('Display Error on Empty Submission', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.click(loginButton);

  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Display Error when Only Email is Provided', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(loginButton);

  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Display Error when Only Password is Provided', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Successful Login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('Console Log on Successful Submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
  consoleSpy.mockRestore();
});

test('Invalid Email Format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(loginButton);

  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

test('Password Field Basic Validation', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, '123');
  fireEvent.click(loginButton);

  expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  expect(console.log).toHaveBeenCalledWith('Email: test@example.com Password: 123');
});

test('Accessibility - Label Associations', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  expect(emailInput).toHaveAttribute('id', emailInput.id);
  expect(passwordInput).toHaveAttribute('id', passwordInput.id);
  expect(screen.getByText('Email:')).toHaveAttribute('for', emailInput.id);
  expect(screen.getByText('Password:')).toHaveAttribute('for', passwordInput.id);
});