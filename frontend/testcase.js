Here's the Jest test code for the Login component:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders all form elements', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('initial state of email and password fields is empty', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  test('no error message is displayed initially', () => {
    render(<Login />);
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

  test('password field masks the input', () => {
    render(<Login />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('form submission with valid inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('form doesn\'t submit with empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('appropriate error messages for empty fields', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission behavior with only email filled', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('submission behavior with only password filled', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message display on validation failure', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('error message clearing after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('Enter key in password field triggers form submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('form elements have proper labels and are accessible', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('form has correct ARIA attributes', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('handles very long email addresses and passwords', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const longEmail = 'very.long.email.address.that.is.definitely.over.fifty.characters@example.com';
    const longPassword = 'ThisIsAVeryLongPasswordThatIsDefinitelyOverFiftyCharacters1234567890';

    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.change(passwordInput, { target: { value: longPassword } });

    expect(emailInput).toHaveValue(longEmail);
    expect(passwordInput).toHaveValue(longPassword);
  });

  test('handles special characters in email and password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const specialEmail = 'special!#$%&\'*+-/=?^_`{|}~@example.com';
    const specialPassword = '!@#$%^&*()_+{}|:"<>?`~';

    fireEvent.change(emailInput, { target: { value: specialEmail } });
    fireEvent.change(passwordInput, { target: { value: specialPassword } });

    expect(emailInput).toHaveValue(specialEmail);
    expect(passwordInput).toHaveValue(specialPassword);
  });

  test('email and password fields are cleared after successful submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
});
```