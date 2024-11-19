import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001: Verify successful login with valid credentials', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'validuser');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Login successful!')).toBeInTheDocument();
  });

  test('TC002: Verify login failure with invalid username', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'invaliduser');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  test('TC003: Verify login failure with invalid password', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'validuser');
    await userEvent.type(screen.getByLabelText('Password:'), 'invalidpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  test('TC004: Verify error message for empty username', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  test('TC005: Verify error message for empty password', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'validuser');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('TC006: Verify password masking', () => {
    render(<Login />);
    
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC007: Verify login button is disabled when fields are empty', () => {
    render(<Login />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
  });

  test('TC008: Verify login button is enabled when both fields are filled', async () => {
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'user');
    await userEvent.type(screen.getByLabelText('Password:'), 'pass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeEnabled();
  });

  test('TC009: Verify error handling for network failure', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Login />);
    
    await userEvent.type(screen.getByLabelText('Username:'), 'networkuser');
    await userEvent.type(screen.getByLabelText('Password:'), 'networkpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Network error. Please try again.')).toBeInTheDocument();
    
    console.error.mockRestore();
  });

  test('TC010: Verify "Remember Me" functionality', async () => {
    render(<Login />);
    
    const rememberMeCheckbox = screen.getByLabelText('Remember Me');
    await userEvent.click(rememberMeCheckbox);
    
    expect(rememberMeCheckbox).toBeChecked();
    
    await userEvent.type(screen.getByLabelText('Username:'), 'validuser');
    await userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Login successful!')).toBeInTheDocument();
    expect(localStorage.getItem('rememberedUser')).toBe('validuser');
  });
});