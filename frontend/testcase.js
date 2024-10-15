import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders all form elements', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('labels are associated with input fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('id', 'password');
  });

  test('form has correct role attribute', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('email and password inputs update state correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

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
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('form submission prevents default behavior', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    const preventDefault = jest.fn();
    fireEvent.submit(form, { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  test('form fields are cleared after successful submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  test('form submission with empty fields shows error message', async () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  test('error message is displayed correctly', async () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Please fill in all fields');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('error-message');
    });
  });

  test('error message is cleared on successful submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    });
  });

  test('form submission using Enter key in input fields', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123{enter}');

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('Tab key navigation works correctly through the form', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    userEvent.tab();
    expect(passwordInput).toHaveFocus();
    userEvent.tab();
    expect(submitButton).toHaveFocus();
  });

  test('extremely long email and password inputs', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const longEmail = 'a'.repeat(256) + '@example.com';
    const longPassword = 'a'.repeat(256);

    userEvent.type(emailInput, longEmail);
    userEvent.type(passwordInput, longPassword);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue(longEmail);
      expect(passwordInput).toHaveValue(longPassword);
    });
  });

  test('special characters in inputs', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    const specialEmail = 'test!#$%&\'*+-/=?^_`{|}~@example.com';
    const specialPassword = '!@#$%^&*()_+{}|:"<>?';

    userEvent.type(emailInput, specialEmail);
    userEvent.type(passwordInput, specialPassword);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue(specialEmail);
      expect(passwordInput).toHaveValue(specialPassword);
    });
  });

  test('rapidly submitting multiple times', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const submitButton = screen.getByRole('button', { name: /login/i });

    for (let i = 0; i < 5; i++) {
      userEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(5);
    });
  });
});
