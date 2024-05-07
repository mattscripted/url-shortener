import { render as rtlRender, screen, waitFor } from '@testing-library/react';
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

  it('submits the form, and renders success state, on API success', async () => {
    const url = 'http://www.google.com/';
    const shortUrlHash = 'shortUrlHash';
    const successMessage = 'Your short URL can be accessed here:';
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          type: 'shortUrl',
          id: shortUrlHash,
          attributes: {
            url,
          }
        },
      }
    });

    const { user, getUrlTextbox, getSubmitButton } = render(<App />);
    const urlTextbox = getUrlTextbox();
    const submitButton = getSubmitButton();

    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: `${process.env.REACT_APP_BACKEND_URL}/${shortUrlHash}` })).not.toBeInTheDocument();

    await user.type(urlTextbox, url);
    await user.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/short-url/), {
        url
      }
    );

    await waitFor(() => {
      expect(screen.getByText(successMessage)).toBeInTheDocument();
      const shortUrlLink = screen.getByRole('link', { name: `${process.env.REACT_APP_BACKEND_URL}/${shortUrlHash}` });
      expect(shortUrlLink).toHaveAttribute('href', `${process.env.REACT_APP_BACKEND_URL}/${shortUrlHash}`);
    });
  });

  it('submits form, and renders error state, on API error', async () => {
    const url = 'http://www.google.com/';
    const errorToastMessage = 'The short URL could not be created. Please try again.';
    axios.post.mockRejectedValueOnce({
      data: {
        errors: [{
          status: 500,
          detail: 'Unable to create short URL.'
        }]
      }
    });

    const { user, getUrlTextbox, getSubmitButton } = render(<App />);
    const urlTextbox = getUrlTextbox();
    const submitButton = getSubmitButton();

    expect(screen.queryByText(errorToastMessage)).not.toBeInTheDocument();

    await user.type(urlTextbox, url);
    await user.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/short-url/), {
        url
      }
    );

    await waitFor(() => {
      expect(screen.getByText(errorToastMessage)).toBeInTheDocument();
    });
  });
});
