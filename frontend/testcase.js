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

  test('allows entering text in email and password fields', async () => {
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

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.type(passwordInput, 'validpassword');
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('valid@email.com', 'validpassword');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('logs successful login attempt', async () => {
    const mockLogin = jest.fn(() => Promise.resolve());
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.type(passwordInput, 'validpassword');
    fireEvent.click(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email: valid@email.com Password: validpassword');
  });

  test('displays error message for invalid email format', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'invalidemail');
    fireEvent.click(loginButton);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('accepts short password without length validation', async () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', '123');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });

  test('displays error message for failed login attempt', async () => {
    const mockLogin = jest.fn(() => Promise.reject('Invalid credentials'));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.type(passwordInput, 'invalidpassword');
    fireEvent.click(loginButton);

    await screen.findByText('Login failed. Please try again.');
  });

  test('displays loading state during login process', async () => {
    const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.type(passwordInput, 'validpassword');
    fireEvent.click(loginButton);

    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  test('prevents multiple login attempts while processing', async () => {
    const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<Login onLogin={mockLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.type(passwordInput, 'validpassword');
    fireEvent.click(loginButton);
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});