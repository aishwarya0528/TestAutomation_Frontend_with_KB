import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  test('renders all form elements correctly', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays login header', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('error message area is initially empty', () => {
    render(<Login />);
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('password field masks input', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('email field accepts valid email formats', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('form submission with valid inputs', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  test('form prevents submission with empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('displays error message for empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('clears input fields and error message after successful submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
    });
  });

  test('pressing Enter in password field triggers form submission', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('pressing Enter in email field moves focus to password field', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.keyDown(emailInput, { key: 'Enter', code: 'Enter' });
    expect(passwordInput).toHaveFocus();
  });

  test('displays and clears error messages', async () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
    });
  });

  test('form elements have proper ARIA attributes and roles', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toHaveAttribute('role', 'form');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id', 'password');
  });

  test('form is navigable using keyboard-only input', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(emailInput).toHaveFocus();
    fireEvent.keyDown(emailInput, { key: 'Tab' });
    expect(passwordInput).toHaveFocus();
    fireEvent.keyDown(passwordInput, { key: 'Tab' });
    expect(submitButton).toHaveFocus();
  });

  test('handles extremely long email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const longString = 'a'.repeat(1000);

    fireEvent.change(emailInput, { target: { value: `${longString}@example.com` } });
    fireEvent.change(passwordInput, { target: { value: longString } });

    expect(emailInput).toHaveValue(`${longString}@example.com`);
    expect(passwordInput).toHaveValue(longString);
  });

  test('handles special characters in inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test!#$%@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '!@#$%^&*()_+' } });

    expect(emailInput).toHaveValue('test!#$%@example.com');
    expect(passwordInput).toHaveValue('!@#$%^&*()_+');
  });

  test('handles rapid form submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    for (let i = 0; i < 5; i++) {
      fireEvent.change(emailInput, { target: { value: `test${i}@example.com` } });
      fireEvent.change(passwordInput, { target: { value: `password${i}` } });
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });
});
