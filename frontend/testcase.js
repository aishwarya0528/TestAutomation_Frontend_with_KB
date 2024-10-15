import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('initial state of email and password fields are empty', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('no error message is displayed initially', () => {
    render(<Login />);
    expect(screen.queryByText(/Please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('email input change updates state correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input change updates state correctly', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    userEvent.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  test('password field masks the input', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('form submission with valid inputs', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('form submission prevents default behavior', () => {
    const mockPreventDefault = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    fireEvent.submit(form, { preventDefault: mockPreventDefault });
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  test('form fields are cleared after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('submission with empty email field', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission with empty password field', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.click(submitButton);

    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission with invalid email format', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'invalid-email');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(emailInput).toBeInvalid();
  });

  test('error message is cleared on successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.click(submitButton);
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(screen.queryByText(/Please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('form elements have proper labels and roles', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('form can be submitted using the Enter key', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const passwordInput = screen.getByLabelText('Password:');
    userEvent.type(passwordInput, 'password123{enter}');

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('very long email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    const longEmail = 'a'.repeat(100) + '@example.com';
    const longPassword = 'a'.repeat(100);

    userEvent.type(emailInput, longEmail);
    userEvent.type(passwordInput, longPassword);

    expect(emailInput).toHaveValue(longEmail);
    expect(passwordInput).toHaveValue(longPassword);
  });

  test('special characters in inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    const specialEmail = 'test!#$%&\'*+-/=?^_`{|}~@example.com';
    const specialPassword = '!@#$%^&*()_+{}|:"<>?';

    userEvent.type(emailInput, specialEmail);
    userEvent.type(passwordInput, specialPassword);

    expect(emailInput).toHaveValue(specialEmail);
    expect(passwordInput).toHaveValue(specialPassword);
  });

  test('rapid consecutive form submissions', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.click(submitButton);
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(3);
  });

  test('tabbing through form fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    userEvent.tab();
    expect(document.activeElement).toBe(passwordInput);

    userEvent.tab();
    expect(document.activeElement).toBe(submitButton);
  });

  test('copy-paste functionality in input fields', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.copy(emailInput);
    await userEvent.clear(emailInput);
    await userEvent.paste(emailInput);

    expect(emailInput).toHaveValue('test@example.com');
  });
});
