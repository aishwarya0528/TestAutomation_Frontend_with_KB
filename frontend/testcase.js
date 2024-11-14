import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toHaveAttribute('placeholder', 'Enter your email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('placeholder', 'Enter your password');
  });

  test('displays error on empty submission', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only email is provided', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only password is provided', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('successful login resets form and removes error message', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('console logs email and password on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
    consoleSpy.mockRestore();
  });

  test('accepts submission with any password length', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: 123');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});