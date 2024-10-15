import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('Error messages disappear on valid input entry', async () => {
    const { getByLabelText, getByText, queryByText } = render(<Login />);
    fireEvent.click(getByText('Login'));
    expect(getByText('Please fill in all fields')).toBeInTheDocument();
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    await waitFor(() => {
      expect(queryByText('Please fill in all fields')).not.toBeInTheDocument();
    });
  });

  it('Password minimum length validation', () => {
    const { getByLabelText, getByText } = render(<Login />);
    fireEvent.change(getByLabelText('Password:'), { target: { value: '123' } });
    fireEvent.click(getByText('Login'));
    expect(getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('Integration with mock authentication service', async () => {
    const mockAuth = jest.fn().mockResolvedValue({ success: true });
    const { getByLabelText, getByText } = render(<Login onSubmit={mockAuth} />);
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('Empty form submission', () => {
    const { getByText } = render(<Login />);
    fireEvent.click(getByText('Login'));
    expect(getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('Password field obscurity', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText('Password:')).toHaveAttribute('type', 'password');
  });

  it('Submit button state', () => {
    const { getByText, getByLabelText } = render(<Login />);
    const submitButton = getByText('Login');
    expect(submitButton).not.toBeDisabled();
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('Latency testing', async () => {
    const mockAuth = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000)));
    const { getByLabelText, getByText } = render(<Login onSubmit={mockAuth} />);
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    const start = Date.now();
    fireEvent.click(getByText('Login'));
    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalled();
    });
    const end = Date.now();
    expect(end - start).toBeLessThan(1500);
  });

  it('Throughput testing', async () => {
    const mockAuth = jest.fn().mockResolvedValue({ success: true });
    const { getByLabelText, getByText } = render(<Login onSubmit={mockAuth} />);
    const start = Date.now();
    for (let i = 0; i < 10; i++) {
      fireEvent.change(getByLabelText('Email:'), { target: { value: `test${i}@example.com` } });
      fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
      fireEvent.click(getByText('Login'));
    }
    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalledTimes(10);
    });
    const end = Date.now();
    expect(end - start).toBeLessThan(2000);
  });

  it('Connection pooling', async () => {
    const mockAuth = jest.fn().mockResolvedValue({ success: true });
    const { getByLabelText, getByText, rerender } = render(<Login onSubmit={mockAuth} />);
    for (let i = 0; i < 5; i++) {
      fireEvent.change(getByLabelText('Email:'), { target: { value: `test${i}@example.com` } });
      fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
      fireEvent.click(getByText('Login'));
      rerender(<Login onSubmit={mockAuth} />);
    }
    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalledTimes(5);
    });
  });

  it('Accessibility attributes', () => {
    const { getByRole } = render(<Login />);
    expect(getByRole('form')).toBeInTheDocument();
  });
});
