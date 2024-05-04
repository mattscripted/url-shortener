import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders "Shorten" button', () => {
    render(<App />);
  
    expect(screen.getByRole('button', 'Shorten')).toBeInTheDocument();
  });
});
