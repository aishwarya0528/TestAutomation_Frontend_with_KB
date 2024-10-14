import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

  test('form has correct role attribute', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toHaveAttribute('role', 'form');
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

  test('password field is of type password', () => {
    render(<Login />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('email field is of type email', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
  });

  test('form submission with valid inputs', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('form submission by pressing Enter in password field', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('submission with empty fields displays error', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission with invalid email format', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message is cleared on successful submission', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.submit(form);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('form elements have proper labels and associations', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id', 'password');
  });

  test('form can be navigated and submitted using only keyboard', () => {
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
});
