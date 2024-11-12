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

  test('input reflection in email and password fields', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error on empty submission', async () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only email is provided', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only password is provided', async () => {
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

  test('displays error message for invalid email format', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'invalidemail');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('accepts short password without length validation', async () => {
    const spyLog = jest.spyOn(console, 'log');
    const mockLogin = jest.fn().mockResolvedValue();
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', '123');
    expect(spyLog).toHaveBeenCalledWith('Email: test@example.com Password: 123');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });

  test('displays error message for incorrect credentials', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(loginButton);

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
  });
});