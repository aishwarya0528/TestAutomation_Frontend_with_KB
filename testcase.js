import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without errors', () => {
    render(<Login />);
  });

  test('all expected elements are present', () => {
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

  test('email input updates state correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input updates state correctly', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('form submission with valid inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('form submission with empty email field', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('form submission with empty password field', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('form submission with both fields empty', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message appears and disappears correctly', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });
});
