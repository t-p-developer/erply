import { render } from '@testing-library/react';
import { Header } from './Header';

test('renders log out button', () => {
  const { getByText } = render(
    <Header token="ab" dispatch={() => {}} removeCredentials={() => {}} />,
  );

  expect(getByText(/log out/i)).toBeInTheDocument();
});

test('renders welcome text', () => {
  const { getByText } = render(
    <Header dispatch={() => {}} removeCredentials={() => {}} />,
  );

  expect(getByText(/welcome/i)).toBeInTheDocument();
});
