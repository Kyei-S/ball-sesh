/**
 * @file DashboardHeading.test.js
 * @author Stephen Kyei
 * @purpose Unit test for DashboardHeading component in Ball Sesh Admin.
 * @description Checks that the "Manage Sessions" heading is rendered.
 * @dependencies Jest, React Testing Library
 */


import { render, screen } from '@testing-library/react';
import DashboardHeading from './DashboardHeading';

test('renders Manage Sessions heading', () => {
  render(<DashboardHeading />);
  const heading = screen.getByText(/Manage Sessions/i);
  expect(heading).toBeInTheDocument();
});
