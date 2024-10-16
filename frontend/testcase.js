import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('Render Input Fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('Allow Input in Fields', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('Display Error on Empty Submission', () => {
  render(<Login />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Display Error when Only Email is Provided', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Display Error when Only Password is Provided', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('Successful Login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

test('Console Log on Successful Submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  consoleSpy.mockRestore();
});
