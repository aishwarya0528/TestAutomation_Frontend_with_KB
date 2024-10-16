import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('Render Input Fields', () => {
  const { getByLabelText } = render(<Login />);
  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
});

test('Allow Input in Fields', () => {
  const { getByLabelText } = render(<Login />);
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});

test('Display Error on Empty Submission', () => {
  const { getByText, getByRole } = render(<Login />);
  const submitButton = getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(getByText(/please fill in all fields/i)).toBeInTheDocument();
});

test('Successful Login', () => {
  const { getByLabelText, getByRole } = render(<Login />);
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByRole('button', { name: /login/i });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});

test('Handle Submit Function Call', () => {
  const { getByLabelText, getByRole, getByText } = render(<Login />);
  const submitButton = getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);
  expect(getByText(/please fill in all fields/i)).toBeInTheDocument();
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});
