Here's the Jest test code for the Login component:

```javascript
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Render Input Fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Allow Input in Fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('Empty Form Submission', () => {
    render(<Login />);
    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Partial Form Submission', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByText('Login');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Successful Login', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByText('Login');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Console Log on Successful Submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByText('Login');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });
});
```