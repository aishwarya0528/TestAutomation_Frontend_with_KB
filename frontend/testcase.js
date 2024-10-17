Here are the 10 test cases corresponding to sections 5.1 through 5.10:

```javascript
// 5.1
test('Login form renders correctly', () => {
  render(<Login />);
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

// 5.2
test('Email input accepts valid email', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  userEvent.type(emailInput, 'test@example.com');
  expect(emailInput).toHaveValue('test@example.com');
});

// 5.3
test('Password input accepts valid password', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('Password:');
  userEvent.type(passwordInput, 'password123');
  expect(passwordInput).toHaveValue('password123');
});

// 5.4
test('Submit button is clickable', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  expect(submitButton).not.toBeDisabled();
});

// 5.5
test('Error message displays for empty fields', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.6
test('Error message clears on successful login', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.7
test('Login with invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

// 5.8
test('Login with short password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();
});

// 5.9
test('Successful login clears form fields', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.10
test('Login with non-existent user', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByRole('button', { name: 'Login' });
  
  userEvent.type(emailInput, 'nonexistent@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('User does not exist')).toBeInTheDocument();
});
```