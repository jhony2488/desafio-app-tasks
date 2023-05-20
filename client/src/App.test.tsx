import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button search react with pesquisar in content button', () => {
  render(<App />);
  const linkElement = screen.getByText(/pesquisar/i);
  expect(linkElement).toBeInTheDocument();
});
