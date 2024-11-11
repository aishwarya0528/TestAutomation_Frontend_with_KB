import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001_Login_InputReflection', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('TC002_Login_EmptySubmission', () => {
    render(<Login />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC003_Login_OnlyEmailProvided', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC004_Login_OnlyPasswordProvided', async () => {
    render(<Login />);
    
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(passwordInput, 'password123');
    
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC005_Login_SuccessfulSubmission', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    fireEvent.click(loginButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC006_Login_PasswordFieldBasicValidation', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    fireEvent.click(loginButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: 123');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });
});