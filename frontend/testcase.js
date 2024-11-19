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

  test('TC002: Verify that the login form accepts input', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('TC003: Display error on empty submission', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC004: Display error when only email is provided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC005: Display error when only password is provided', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC006: Verify successful login with valid credentials', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('TC007: Console log on successful submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: password123');
    consoleSpy.mockRestore();
  });

  test('TC008: Password field basic validation', async () => {
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
});