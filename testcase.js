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
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('validates accessibility attributes', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toHaveAttribute('role', 'form');
    expect(screen.getByLabelText('Email:')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('id', 'password');
  });

  test('updates email and password state on input change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays placeholder text correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('placeholder', 'Enter your email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('placeholder', 'Enter your password');
  });

  test('masks password input', () => {
    render(<Login />);
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
  });

  test('submits form with valid inputs', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('prevents default behavior on form submission', () => {
    const mockPreventDefault = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');

    fireEvent.submit(form, { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });

  test('clears form fields after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('displays error message for empty fields', () => {
    render(<Login />);
    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('clears error message on successful submission', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.submit(form);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('submits form using Enter key in email field', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const emailInput = screen.getByLabelText('Email:');
    fireEvent.keyDown(emailInput, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('submits form using Enter key in password field', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('handles very long email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    const longEmail = 'a'.repeat(100) + '@example.com';
    const longPassword = 'a'.repeat(100);

    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.change(passwordInput, { target: { value: longPassword } });

    expect(emailInput).toHaveValue(longEmail);
    expect(passwordInput).toHaveValue(longPassword);
  });

  test('handles special characters in inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    const specialEmail = 'test!#$%^&*@example.com';
    const specialPassword = '!@#$%^&*()_+';

    fireEvent.change(emailInput, { target: { value: specialEmail } });
    fireEvent.change(passwordInput, { target: { value: specialPassword } });

    expect(emailInput).toHaveValue(specialEmail);
    expect(passwordInput).toHaveValue(specialPassword);
  });

  test('handles rapid form submissions', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    for (let i = 0; i < 10; i++) {
      fireEvent.submit(form);
    }

    expect(mockSubmit).toHaveBeenCalledTimes(10);
  });
});