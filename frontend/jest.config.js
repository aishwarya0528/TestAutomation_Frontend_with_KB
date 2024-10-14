module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: ['**/testcase.js'],
  moduleDirectories: ['node_modules', 'src', '.'],
  rootDir: 'frontend'
};
