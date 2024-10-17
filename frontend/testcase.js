import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('displays error message when submitting empty form', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('clears form fields and error message after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('logs email and password to console on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('displays error for invalid email format', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'invalid-email');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays error for short password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'short');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('disables submit button while processing', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'password123');

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Logging in...');
  });

  test('displays network error message', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Network error. Please try again.')).toBeInTheDocument();
  });

  test('redirects to dashboard on successful login', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(window.location.pathname).toBe('/dashboard');
  });

  test('displays custom error message from server', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
  });
});