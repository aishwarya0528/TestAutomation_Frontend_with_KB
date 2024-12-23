import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('displays error message when submitting empty form', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting form with empty email', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting form with empty password', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('clears form fields and error message after successful submission', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('logs email and password to console on successful submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('email input has type "email"', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('type', 'email');
  });

  test('password input has type "password"', () => {
    render(<Login />);
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
  });

  test('email input has placeholder text', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('placeholder', 'Enter your email');
  });

  test('password input has placeholder text', () => {
    render(<Login />);
    expect(screen.getByLabelText('Password:')).toHaveAttribute('placeholder', 'Enter your password');
  });
});
