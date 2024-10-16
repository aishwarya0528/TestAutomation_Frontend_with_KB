import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Render Input Fields', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Allow Input in Fields', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('Display Error on Empty Submission', () => {
    render(<Login />);
    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Successful Login', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Login');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('Handle Submit Function Call', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });
});
