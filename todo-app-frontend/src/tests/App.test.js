import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders todo app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todo App/i);
  const buttonElement = screen.getByText(/New List/i);

  expect(linkElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
