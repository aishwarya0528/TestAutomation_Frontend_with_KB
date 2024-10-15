import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form correctly with all expected elements', () => {
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

  test('email and password input fields are present with correct types', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('labels for email and password fields are present', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('login button is rendered with correct text', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('email and password inputs update state correctly when changed', () => {
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

  test('form submission with valid email and password', async () => {
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

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('form fields are cleared after successful submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  test('form submission prevention when fields are empty', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message is displayed when submitting with empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message clearing when valid input is provided after an error', () => {
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

  test('form elements have proper aria labels', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id', 'password');
  });

  test('keyboard navigation through the form', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    userEvent.tab();
    expect(document.activeElement).toBe(passwordInput);

    userEvent.tab();
    expect(document.activeElement).toBe(submitButton);
  });

  test('form submission with very long email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const longEmail = 'a'.repeat(256) + '@example.com';
    const longPassword = 'a'.repeat(100);

    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.change(passwordInput, { target: { value: longPassword } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe(longEmail);
    expect(passwordInput.value).toBe(longPassword);
  });

  test('form submission with special characters in email and password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const specialEmail = 'test+special@example.com';
    const specialPassword = 'p@ssw0rd!';

    fireEvent.change(emailInput, { target: { value: specialEmail } });
    fireEvent.change(passwordInput, { target: { value: specialPassword } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe(specialEmail);
    expect(passwordInput.value).toBe(specialPassword);
  });

  test('form submission with leading/trailing spaces in inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const emailWithSpaces = '  test@example.com  ';
    const passwordWithSpaces = '  password123  ';

    fireEvent.change(emailInput, { target: { value: emailWithSpaces } });
    fireEvent.change(passwordInput, { target: { value: passwordWithSpaces } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe(emailWithSpaces);
    expect(passwordInput.value).toBe(passwordWithSpaces);
  });

  test('pressing Enter in password field submits the form', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('Enter key in email field moves focus to password field', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    emailInput.focus();
    fireEvent.keyDown(emailInput, { key: 'Enter', code: 'Enter' });

    expect(document.activeElement).toBe(passwordInput);
  });
});