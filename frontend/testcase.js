import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Renders login form', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('Submits form with valid inputs', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('Displays error message for empty fields', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  test('Clears form fields after submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('Submits form on Enter key press', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.keyDown(screen.getByLabelText(/password/i), { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('Error messages disappear on valid input entry', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    expect(screen.queryByText(/Please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('Email format validation', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(emailInput.validity.valid).toBe(false);
  });

  test('Password minimum length validation', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(passwordInput.validity.valid).toBe(false);
  });

  test('Accessibility attributes', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('required');
    expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute('type', 'submit');
  });

  test('Integration with mock authentication service', () => {
    const mockAuthService = {
      login: jest.fn().mockResolvedValue({ success: true })
    };
    render(<Login authService={mockAuthService} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
