import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

const mockSubmit = jest.fn();

beforeEach(() => {
  mockSubmit.mockClear();
});

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('submits form with valid inputs', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
});

test('displays error message for empty fields', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.click(submitButton);

  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('clears form fields after submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});

test('submits form on Enter key press', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });

  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
});

test('error messages disappear on valid input entry', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.click(submitButton);
  
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  await waitFor(() => {
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  expect(submitButton).toBeEnabled();

  fireEvent.click(submitButton);
});
