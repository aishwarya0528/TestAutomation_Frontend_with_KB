import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001_Login_RenderForm', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('TC002_Login_InputReflection', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
    expect(screen.getByLabelText('Password:')).toHaveValue('password123');
  });

  test('TC003_Login_EmptySubmission', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC004_Login_OnlyEmailProvided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC005_Login_OnlyPasswordProvided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC006_Login_SuccessfulLogin', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('TC007_Login_ConsoleLogOnSuccess', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
    consoleSpy.mockRestore();
  });

  test('TC008_Login_InvalidEmailFormat', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'invalidemail');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('TC009_Login_PasswordFieldBasicValidation', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), '123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: 123');
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test('TC010_Login_Accessibility', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);
    
    userEvent.tab();
    expect(document.activeElement).toBe(passwordInput);
    
    userEvent.tab();
    expect(document.activeElement).toBe(loginButton);
  });
});