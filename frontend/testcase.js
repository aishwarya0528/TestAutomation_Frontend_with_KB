Here's the Jest test code based on the provided test cases:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows input in email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error message when submitting empty form', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting with empty email', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when submitting with empty password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('clears form inputs after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('logs email and password to console on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('displays error message for invalid email format', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'invalidemail');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays error message when password is too short', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'short');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('ensures proper label associations for input fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id');
  });

  test('allows keyboard navigation for interactive elements', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    userEvent.tab();
    expect(document.activeElement).toBe(passwordInput);

    userEvent.tab();
    expect(document.activeElement).toBe(loginButton);
  });

  test('renders login form without noticeable delay', () => {
    const startTime = performance.now();
    render(<Login />);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('is compatible with the latest stable versions of React and React Testing Library', () => {
    expect(() => render(<Login />)).not.toThrow();
  });
});
```