import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

function render(ui) {
  const user = userEvent.setup();
  rtlRender(ui);
  
  const getUrlTextbox = () => screen.getByRole('textbox', {
    name: 'Enter a URL to shorten:',
  });
  const getSubmitButton = () => screen.getByRole('button', { name: 'Shorten' });

  return {
    user,
    getUrlTextbox,
    getSubmitButton,
  }
}

describe('App', () => {
  it('renders a text input to enter a short URL', () => {
    const { getUrlTextbox } = render(<App />);
    expect(getUrlTextbox()).toBeInTheDocument();
  });

  it('renders a "Shorten" button', () => {
    const { getSubmitButton } = render(<App />);
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it('renders a "Required" error, if the URL is empty', async () => {
    const { user, getUrlTextbox, getSubmitButton } = render(<App />);
    const urlTextbox = getUrlTextbox();
    const submitButton = getSubmitButton();
    const errorMessage = 'Required';

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    await user.click(urlTextbox);
    await user.click(submitButton);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('renders an "Invalid URL" error, if the URL is invalid', async () => {
    const { user, getUrlTextbox, getSubmitButton } = render(<App />);
    const urlTextbox = getUrlTextbox();
    const submitButton = getSubmitButton();
    const errorMessage = 'Invalid URL';

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    await user.type(urlTextbox, 'not-a-url');
    await user.click(submitButton);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('submits the form, and renders success state', async () => {
    const url = 'http://www.google.com/';
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          type: 'shortUrl',
          id: 'short-url-hash',
          attributes: {
            url,
          }
        },
      }
    });

    const { user, getUrlTextbox, getSubmitButton } = render(<App />);
    const urlTextbox = getUrlTextbox();
    const submitButton = getSubmitButton();

    await user.type(urlTextbox, url);
    await user.click(submitButton);

    // expect(axios.post).toHaveBeenCalledWith('/api/short-url')

    expect(await screen.findByText('Your short URL can be accessed here:')).toBeInTheDocument();
  });
});
