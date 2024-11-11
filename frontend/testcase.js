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
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only email is provided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error when only password is provided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('successful login resets form and removes error messages', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({});
    render(<Login onSubmit={mockSubmit} />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('logs successful login attempt', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({});
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login onSubmit={mockSubmit} />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
  });

  test('password field basic validation', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({});
    render(<Login onSubmit={mockSubmit} />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123',
    });
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });

  test('displays error message for incorrect login credentials', async () => {
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<Login onSubmit={mockSubmit} />);
    await userEvent.type(screen.getByLabelText('Email:'), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
  });
});