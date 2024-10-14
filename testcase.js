import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders all form elements correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('login button is present and enabled', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeEnabled();
  });

  test('email and password inputs update state correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('password field masks the input', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('form prevents submission with empty fields', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message is displayed for empty fields', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('form clears after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('form submission via button click and Enter key press', () => {
    const handleSubmit = jest.fn();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);
    fireEvent.keyPress(passwordInput, { key: 'Enter', code: 13, charCode: 13 });

    expect(handleSubmit).toHaveBeenCalledTimes(2);
  });

  test('verify focus states of input fields and buttons', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(emailInput).toHaveFocus();

    passwordInput.focus();
    expect(passwordInput).toHaveFocus();

    loginButton.focus();
    expect(loginButton).toHaveFocus();
  });
});
