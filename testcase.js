Here's the Jest test code for the Login component based on the provided structure and requirements:

```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders all form elements', () => {
    const { getByLabelText, getByRole } = render(<Login />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles email input change', () => {
    const { getByLabelText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('handles password input change', () => {
    const { getByLabelText } = render(<Login />);
    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('displays error message when fields are empty', async () => {
    const { getByRole, findByRole } = render(<Login />);
    fireEvent.click(getByRole('button', { name: /login/i }));
    const errorMessage = await findByRole('alert');
    expect(errorMessage).toHaveTextContent(/please fill in all fields/i);
  });

  test('submits form with valid inputs', async () => {
    const { getByLabelText, getByRole } = render(<Login />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(getByLabelText(/email/i).value).toBe('');
      expect(getByLabelText(/password/i).value).toBe('');
    });
  });

  test('handles very long email addresses', () => {
    const { getByLabelText } = render(<Login />);
    const longEmail = 'a'.repeat(100) + '@example.com';
    fireEvent.change(getByLabelText(/email/i), { target: { value: longEmail } });
    expect(getByLabelText(/email/i).value).toBe(longEmail);
  });

  test('handles special characters in password', () => {
    const { getByLabelText } = render(<Login />);
    const specialPassword = '!@#$%^&*()_+';
    fireEvent.change(getByLabelText(/password/i), { target: { value: specialPassword } });
    expect(getByLabelText(/password/i).value).toBe(specialPassword);
  });

  test('clears form fields after successful submission', async () => {
    const { getByLabelText, getByRole } = render(<Login />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(getByLabelText(/email/i).value).toBe('');
      expect(getByLabelText(/password/i).value).toBe('');
    });
  });

  test('form elements have proper aria labels', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText(/email/i)).toHaveAttribute('aria-describedby', 'email-error');
    expect(getByLabelText(/password/i)).toHaveAttribute('aria-describedby', 'password-error');
  });
});
```

For the App component and index.js, you can add these tests:

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App component renders without crashing', () => {
  render(<App />);
});

jest.mock('./reportWebVitals', () => jest.fn());
import reportWebVitals from './reportWebVitals';
import { renderToString } from 'react-dom/server';
import App from './App';

test('reportWebVitals is called', () => {
  renderToString(<App />);
  expect(reportWebVitals).toHaveBeenCalled();
});
```

These tests cover the main requirements outlined in the provided structure, including component rendering, form interactions, validation, accessibility, edge cases, and state management.