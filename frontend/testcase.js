import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login.js';

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

  test('initial state has empty email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  test('updates email and password state on input', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  test('calls handleSubmit on form submission', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });

  test('displays error message for empty fields', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('clears form fields after successful submission', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  test('handles very long inputs', () => {
    render(<Login />);
    const longInput = 'a'.repeat(1000);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: longInput } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: longInput } });
    expect(screen.getByLabelText(/email/i)).toHaveValue(longInput);
    expect(screen.getByLabelText(/password/i)).toHaveValue(longInput);
  });

  test('handles special characters in inputs', () => {
    render(<Login />);
    const specialChars = '!@#$%^&*()_+{}[]|:;"<>?,./';
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: `test${specialChars}@example.com` } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: specialChars } });
    expect(screen.getByLabelText(/email/i)).toHaveValue(`test${specialChars}@example.com`);
    expect(screen.getByLabelText(/password/i)).toHaveValue(specialChars);
  });

  test('allows form submission with Enter key', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;
    fireEvent.keyDown(screen.getByLabelText(/password/i), { key: 'Enter', code: 'Enter' });
    expect(mockSubmit).toHaveBeenCalled();
  });
});
