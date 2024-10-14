Here's the Jest test code for the Login component:

```javascript
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders Login component correctly', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('handles email input change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('handles password input change', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('displays error message when fields are empty', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields');
    });
  });

  test('submits form with valid inputs', async () => {
    const mockSubmit = jest.fn();
    render(<Login onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('clears form fields after successful submission', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  test('handles long email addresses', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const longEmail = 'very.long.email.address.that.is.still.valid@example.com';
    fireEvent.change(emailInput, { target: { value: longEmail } });
    expect(emailInput.value).toBe(longEmail);
  });

  test('handles special characters in password', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const specialPassword = 'P@ssw0rd!@#$%^&*()';
    fireEvent.change(passwordInput, { target: { value: specialPassword } });
    expect(passwordInput.value).toBe(specialPassword);
  });

  test('checks for proper aria labels', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('aria-describedby', 'password-error');
  });

  test('mocks successful login API call', async () => {
    const mockLoginApi = jest.fn(() => Promise.resolve({ success: true }));
    render(<Login loginApi={mockLoginApi} />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(mockLoginApi).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('mocks failed login API call', async () => {
    const mockLoginApi = jest.fn(() => Promise.reject(new Error('Invalid credentials')));
    render(<Login loginApi={mockLoginApi} />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
  });
});
```