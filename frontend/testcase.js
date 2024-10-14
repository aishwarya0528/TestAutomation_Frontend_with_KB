import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('renders all expected elements', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('updates email and password inputs correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('verifies input types', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  it('handles form submission with valid inputs', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    });

    consoleSpy.mockRestore();
  });

  it('shows error message for empty fields', async () => {
    render(<Login />);
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it('handles very long inputs', () => {
    render(<Login />);
    const longString = 'a'.repeat(1000);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: `${longString}@example.com` } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: longString } });

    expect(screen.getByLabelText(/email/i).value).toBe(`${longString}@example.com`);
    expect(screen.getByLabelText(/password/i).value).toBe(longString);
  });

  it('handles special characters in inputs', () => {
    render(<Login />);
    const specialChars = '!@#$%^&*()_+{}[]|":;<>?';
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: `test${specialChars}@example.com` } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: specialChars } });

    expect(screen.getByLabelText(/email/i).value).toBe(`test${specialChars}@example.com`);
    expect(screen.getByLabelText(/password/i).value).toBe(specialChars);
  });
});