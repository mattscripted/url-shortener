import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders a text input to enter a short URL', () => {
    render(<App />);
    expect(screen.getByRole('textbox', {
      name: 'Enter a URL to shorten:',
    })).toBeInTheDocument();
  });

  it('renders a "Shorten" button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Shorten' })).toBeInTheDocument();
  });

  it('renders a "Required" error, if the URL is empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    const urlTextbox = screen.getByRole('textbox', {
      name: 'Enter a URL to shorten:',
    });
    const submitButton = screen.getByRole('button', { name: 'Shorten' })

    expect(screen.queryByText('Required')).not.toBeInTheDocument();

    await user.click(urlTextbox);
    await user.click(submitButton);

    expect(await screen.findByText('Required')).toBeInTheDocument();
  });
});
