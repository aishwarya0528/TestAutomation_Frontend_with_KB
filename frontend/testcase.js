Here's the Jest test code for the Login component:

```javascript
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without errors', () => {
    render(<Login />);
  });

  test('all form elements are present', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('initial state values are empty', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('email input updates state correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input updates state correctly', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('password input is of type password', () => {
    render(<Login />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('form submission with valid inputs', async () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('form fields are cleared after successful submission', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
  });

  test('console.log is called with correct email and password', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockConsoleLog).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    mockConsoleLog.mockRestore();
  });

  test('submission with empty email field', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission with empty password field', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission with both fields empty', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message is cleared on successful submission', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
    });
  });

  test('form has a role of form', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('inputs have associated labels', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('keyboard navigation and focus management', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    fireEvent.keyDown(emailInput, { key: 'Tab' });
    expect(document.activeElement).toBe(passwordInput);

    fireEvent.keyDown(passwordInput, { key: 'Tab' });
    expect(document.activeElement).toBe(submitButton);
  });

  test('very long email and password inputs', () => {
    render(<Login />);
    const longString = 'a'.repeat(1000);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: `${longString}@example.com` } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: longString } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('special characters in email and password', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test!@#$%^&*()@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass!@#$%^&*()word123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('pressing Enter in the password field triggers form submission', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.keyDown(screen.getByLabelText(/password/i), { key: 'Enter' });

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('Enter key in email field doesn\'t submit the form', () => {
    const mockSubmit = jest.fn();
    render(<Login />);
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.keyDown(screen.getByLabelText(/email/i), { key: 'Enter' });

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```