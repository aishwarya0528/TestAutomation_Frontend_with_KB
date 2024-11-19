import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('allows entering text into email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error message for empty form submission', async () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  test('displays error message when only email is provided', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  test('displays error message when only password is provided', async () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  test('successful login with valid credentials', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('logs entered email and password to console on successful submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
    });

    consoleSpy.mockRestore();
  });

  test('displays error message for invalid email format', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'invalidemail');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });
  });

  test('password field basic validation', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, '123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: 123');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test('displays error message for invalid credentials', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    });
  });
});