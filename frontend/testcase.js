import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

const mockSubmit = jest.fn();

beforeEach(() => {
  mockSubmit.mockClear();
});

test('form can be submitted using keyboard only', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  submitButton.focus();

  fireEvent.keyDown(submitButton, { key: 'Enter', code: 'Enter' });

  expect(screen.queryByText(/please fill in all fields/i)).toBeNull();
});

test('handles very long email/password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: /login/i });

  const longEmail = 'a'.repeat(256) + '@example.com';
  const longPassword = 'b'.repeat(100);

  fireEvent.change(emailInput, { target: { value: longEmail } });
  fireEvent.change(passwordInput, { target: { value: longPassword } });

  fireEvent.click(submitButton);

  expect(screen.queryByText(/error/i)).toBeNull();
});

test('handles rapid consecutive submissions', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  fireEvent.click(submitButton);
  fireEvent.click(submitButton);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.queryByText(/error/i)).toBeNull();
  });
});

test('error message disappears on valid input entry', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.click(submitButton);
  expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  await waitFor(() => {
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  fireEvent.click(submitButton);
  expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
});
