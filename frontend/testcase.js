import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows input in email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error message when submitting empty form', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting with only email', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting with only password', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('clears form fields and error message after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('logs email and password to console on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    
    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('displays error message for invalid email format', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'invalidemail');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays error message for short password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'short');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('displays error message for invalid login credentials', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'wrong@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
