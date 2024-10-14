import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login component', () => {
  render(<App />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});

// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Login Form Rendering', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  test('Login Button Presence', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  test('Successful Login', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(loginButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'admin@example.com', 'Password:', 'password123');
    consoleSpy.mockRestore();
  });

  test('Failed Login - Empty Fields', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Failed Login - Empty Email', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Failed Login - Empty Password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });
});

// index.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

test('renders without crashing', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  require('./index.js');
  expect(createRoot).toHaveBeenCalledWith(div);
});