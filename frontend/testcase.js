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

  test('input fields reflect entered text', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error message for empty submission', async () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when only email is provided', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when only password is provided', async () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('successful login with valid credentials', async () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('logs successful login attempt', async () => {
    const spyLog = jest.spyOn(console, 'log');
    const mockLogin = jest.fn().mockResolvedValue();
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    expect(spyLog).toHaveBeenCalledWith('Email: user@example.com Password: password123');
  });

  test('password field basic validation', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    fireEvent.click(loginButton);

    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith('Email: test@example.com Password: 123');
  });

  test('displays error message for invalid credentials', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(loginButton);

    expect(await screen.findByText('Invalid email or password.')).toBeInTheDocument();
  });

  test('disables login button while processing', async () => {
    const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
    await screen.findByRole('button', { name: 'Logging in...' });
  });

  test('form elements are keyboard accessible', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    passwordInput.focus();
    expect(document.activeElement).toBe(passwordInput);

    loginButton.focus();
    expect(document.activeElement).toBe(loginButton);
  });
});