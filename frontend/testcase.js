Here's the Jest test code based on the provided Login component:

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('Render Input Fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('Allow Input in Fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('Empty Form Submission', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Empty Email Field', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Successful Login', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    userEvent.type(emailInput, 'valid@email.com');
    userEvent.type(passwordInput, 'validPassword123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
    });
  });

  test('Console Log on Successful Submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('Accessibility', () => {
    render(<Login />);
    
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    submitButton.focus();
    expect(document.activeElement).toBe(submitButton);
    
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeInTheDocument();
  });
});
```