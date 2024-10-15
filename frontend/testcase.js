import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  test('Render Test', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('Input Handling', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
    expect(passwordInput.type).toBe('password');
  });

  test('Form Submission', () => {
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
  });

  test('Validation', () => {
    render(<Login />);
    const form = screen.getByRole('form');

    fireEvent.submit(form);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(form);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('Error Handling', () => {
    render(<Login />);
    const form = screen.getByRole('form');

    fireEvent.submit(form);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('Accessibility', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    fireEvent.keyDown(emailInput, { key: 'Tab' });
    expect(document.activeElement).toBe(passwordInput);

    fireEvent.keyDown(passwordInput, { key: 'Tab' });
    expect(document.activeElement).toBe(submitButton);

    fireEvent.keyDown(submitButton, { key: 'Enter' });
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('State Management', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('Edge Cases', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const longInput = 'a'.repeat(1000);
    fireEvent.change(emailInput, { target: { value: longInput + '@example.com' } });
    fireEvent.change(passwordInput, { target: { value: longInput } });
    fireEvent.submit(form);

    const specialChars = '!@#$%^&*()_+{}[]|:;"<>,.?/~`';
    fireEvent.change(emailInput, { target: { value: 'test' + specialChars + '@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' + specialChars } });
    fireEvent.submit(form);

    for (let i = 0; i < 10; i++) {
      fireEvent.submit(form);
    }
  });
});
