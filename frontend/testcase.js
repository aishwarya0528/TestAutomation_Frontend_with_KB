import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001: Verify that the login page loads correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('TC002: Verify successful login with valid credentials', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC003: Verify login failure with invalid username', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'invaliduser@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC004: Verify login failure with invalid password', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'invalidpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC005: Verify login failure with empty username', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC006: Verify login failure with empty password', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC007: Verify password masking', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC008: Verify error message for invalid email format', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'invalidemail');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('TC009: Verify password field basic validation', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), '123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });

  test('TC010: Verify login attempt logging', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: validpass');
  });
});