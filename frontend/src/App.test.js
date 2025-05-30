/**
 * frontend/src/App.test.js
 * @file App.test.js
 * @author Stephen Kyei
 * @purpose Unit test for the main App component of the frontend.
 *          Verifies that the application renders the primary heading as expected.
 * @dependencies Jest, React Testing Library
 */


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Choose Your Session heading', () => {
  render(<App />);
  const heading = screen.getByText(/Choose Your Session/i);
  expect(heading).toBeInTheDocument();
});
