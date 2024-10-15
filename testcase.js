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

  test('initial state is empty', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('email input updates state correctly', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
  });

  test('password input updates state correctly', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  test('password input is of type password', () => {
    render(<Login />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('form submission with valid inputs', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  test('form submission prevents default behavior', () => {
    const preventDefault = jest.fn();
    render(<Login />);
    fireEvent.submit(screen.getByRole('form'), { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  test('form submission with empty email shows error', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('form submission with empty password shows error', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('form submission with both fields empty shows error', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message is cleared on successful submission', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('form has correct role attribute', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('labels are correctly associated with inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('Enter key triggers form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.keyDown(screen.getByLabelText(/password/i), { key: 'Enter', code: 'Enter' });
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
  });

  test('handles very long email and password inputs', () => {
    render(<Login />);
    const longString = 'a'.repeat(100);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: `${longString}@example.com` } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: longString } });
    expect(screen.getByLabelText(/email/i)).toHaveValue(`${longString}@example.com`);
    expect(screen.getByLabelText(/password/i)).toHaveValue(longString);
  });

  test('handles special characters in email and password', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test!#$%@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass!@#$%^&*()' } });
    expect(screen.getByLabelText(/email/i)).toHaveValue('test!#$%@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('pass!@#$%^&*()');
  });
});
