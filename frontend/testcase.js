import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders all expected elements', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('initial state is correct', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('updates email state on input change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('updates password state on input change', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays correct input placeholders', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('submits form with valid inputs', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('prevents form submission with empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submits form with Enter key press', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('displays error for empty email', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('displays error for empty password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('clears error message on successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('form elements are properly labeled', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id', 'password');
  });

  test('form can be submitted using keyboard only', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.keyDown(emailInput, { key: 'Tab', code: 'Tab' });

    expect(document.activeElement).toBe(passwordInput);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.keyDown(passwordInput, { key: 'Tab', code: 'Tab' });

    expect(document.activeElement).toBe(submitButton);
    fireEvent.keyDown(submitButton, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('handles very long email/password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const longEmail = 'a'.repeat(100) + '@example.com';
    const longPassword = 'a'.repeat(100);

    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.change(passwordInput, { target: { value: longPassword } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue(longEmail);
    expect(passwordInput).toHaveValue(longPassword);
  });

  test('handles special characters in inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test!@#$%^&*()@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass!@#$%^&*()word123' } });

    expect(emailInput).toHaveValue('test!@#$%^&*()@example.com');
    expect(passwordInput).toHaveValue('pass!@#$%^&*()word123');
  });

  test('handles rapid consecutive submissions', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const submitButton = screen.getByRole('button', { name: /login/i });

    for (let i = 0; i < 5; i++) {
      fireEvent.click(submitButton);
    }

    expect(mockSubmit).toHaveBeenCalledTimes(5);
  });

  test('error message disappears on valid input entry', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('component performance with many rapid input changes', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      fireEvent.change(emailInput, { target: { value: `test${i}@example.com` } });
      fireEvent.change(passwordInput, { target: { value: `password${i}` } });
    }
    const end = performance.now();

    expect(end - start).toBeLessThan(1000); // Assuming 1 second is an acceptable threshold
  });
});