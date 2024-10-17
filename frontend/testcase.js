import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error message when submitting empty form', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('clears form fields after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('logs email and password to console on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('displays error message for invalid email format', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('displays error message for short password', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  test('allows submission with valid email and password', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('trims whitespace from email input', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '  test@example.com  ' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByLabelText(/email/i).value).toBe('test@example.com');
  });

  test('prevents default form submission', () => {
    const preventDefault = jest.fn();
    render(<Login />);
    
    fireEvent.submit(screen.getByRole('form'), { preventDefault });
    
    expect(preventDefault).toHaveBeenCalled();
  });

  test('focuses on email input on component mount', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
  });
});
