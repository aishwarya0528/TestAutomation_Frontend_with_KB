import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('TC001: Verify that the login page loads correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('TC002: Verify that the login is successful with valid credentials', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('TC003: Verify that an error message is displayed for empty submission', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC004: Verify that an error message is displayed when only email is provided', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC005: Verify that an error message is displayed when only password is provided', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Password:'), 'password');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('TC006: Verify that the entered text is reflected in both email and password fields', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'password');
    expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
    expect(screen.getByLabelText('Password:')).toHaveValue('password');
  });

  test('TC007: Verify that the form resets after successful submission', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('TC008: Verify that the entered email and password are logged to the console upon successful submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'validpass');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Email: test@example.com Password: validpass');
    consoleSpy.mockRestore();
  });

  test('TC009: Verify that the form accepts submission with a short password (no length validation)', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), '123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Password must be at least 6 characters long')).not.toBeInTheDocument();
  });

  test('TC010: Verify proper label associations for accessibility', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('id', 'password');
  });
});