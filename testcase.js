Here are the Jest test cases for the provided JavaScript files:

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('form elements are present', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('email input change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('password input change', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('form submission with empty fields', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields');
    });
  });

  test('form submission with valid inputs', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  test('accessibility - aria labels', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-describedby', 'password-error');
  });

  test('edge case - long email address', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'very.long.email.address.that.is.still.valid@example.com' } });
    expect(emailInput.value).toBe('very.long.email.address.that.is.still.valid@example.com');
  });

  test('edge case - special characters in password', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'p@ssw0rd!@#$%^&*()' } });
    expect(passwordInput.value).toBe('p@ssw0rd!@#$%^&*()');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
});

jest.mock('./reportWebVitals', () => jest.fn());
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';
import App from './App';

test('reportWebVitals is called', () => {
  render(<App />);
  expect(reportWebVitals).toHaveBeenCalled();
});
```