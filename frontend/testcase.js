Here's the Jest test code based on the provided test cases and the Login component:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('allows input in email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits form with valid email and password', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('displays error for invalid email format', () => {
    render(<Login />);
    
    userEvent.type(screen.getByLabelText('Email:'), 'invalidemail');
    userEvent.type(screen.getByLabelText('Password:'), 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays error for password less than 8 characters', () => {
    render(<Login />);
    
    userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'short');
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('displays error for invalid credentials', () => {
    render(<Login />);
    
    userEvent.type(screen.getByLabelText('Email:'), 'wrong@example.com');
    userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword');
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });

  test('displays error message when submitting empty form', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('login form is accessible', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    expect(emailInput).toHaveAttribute('aria-label', 'Email');
    expect(passwordInput).toHaveAttribute('aria-label', 'Password');
    expect(submitButton).toHaveAttribute('type', 'submit');

    emailInput.focus();
    fireEvent.keyDown(emailInput, { key: 'Tab' });
    expect(document.activeElement).toBe(passwordInput);
    fireEvent.keyDown(passwordInput, { key: 'Tab' });
    expect(document.activeElement).toBe(submitButton);
  });

  test('login form renders without noticeable delay', () => {
    const startTime = performance.now();
    render(<Login />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('login component is compatible with current React and Testing Library versions', () => {
    expect(React.version).toMatch(/^18/);
    expect(screen).toBeDefined();
    expect(fireEvent).toBeDefined();
    expect(userEvent).toBeDefined();
  });
});
```