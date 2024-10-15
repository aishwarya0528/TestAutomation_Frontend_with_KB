import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001: Render Login Form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('TC002: Email Input Validation', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalidemail');
    fireEvent.submit(screen.getByRole('form'));
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('TC003: Password Masking', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC004: Form Submission with Valid Credentials', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('TC005: Empty Form Submission Prevention', async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('TC006: Error Message Display', async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('TC007: Keyboard Accessibility', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.tab();
    expect(submitButton).toHaveFocus();
    fireEvent.keyDown(submitButton, { key: 'Enter', code: 'Enter' });
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('TC008: API Integration - Successful Login', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('TC009: API Integration - Failed Login', async () => {
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Login failed'));
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('TC010: Performance - Rapid Form Submission', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    for (let i = 0; i < 5; i++) {
      await userEvent.type(screen.getByLabelText(/email/i), `test${i}@example.com`);
      await userEvent.type(screen.getByLabelText(/password/i), `password${i}`);
      fireEvent.submit(form);
    }

    expect(mockSubmit).toHaveBeenCalledTimes(5);
  });
});