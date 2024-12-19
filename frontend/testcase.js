import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001_Login_ValidCredentials', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('TC002_Login_EmptyFields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(submitButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC003_Login_EmptyEmail', async () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC004_Login_EmptyPassword', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(submitButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC005_Login_InvalidEmail', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'invalidemail');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(emailInput).toBeInvalid();
  });

  test('TC006_Login_ClearFields', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('TC007_Login_ErrorMessageCleared', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(submitButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC008_Login_PasswordVisibility', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');

    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC009_Login_EmailPlaceholder', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');

    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
  });

  test('TC010_Login_PasswordPlaceholder', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');

    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
  });
});
