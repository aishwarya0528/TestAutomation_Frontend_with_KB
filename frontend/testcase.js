Here's the Jest test code for the Login component:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('renders login form with email and password fields', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows users to enter text in email and password fields', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays error message for empty fields', () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('handles successful login', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('logs email and password to console on successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('ensures form is accessible', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toHaveAttribute('id');
    expect(passwordInput).toHaveAttribute('id');
    expect(loginButton).toBeInTheDocument();

    emailInput.focus();
    fireEvent.keyDown(emailInput, { key: 'Tab' });
    expect(passwordInput).toHaveFocus();
    fireEvent.keyDown(passwordInput, { key: 'Tab' });
    expect(loginButton).toHaveFocus();
  });

  test('renders and responds without noticeable delay', () => {
    const startTime = performance.now();
    render(<Login />);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });
});
```