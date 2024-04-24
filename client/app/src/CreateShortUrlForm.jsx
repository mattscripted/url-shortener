import React, { useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreateShortUrlForm() {
  const [url, setUrl] = useState('');

  const onChangeUrl = (event) => {
    setUrl(event.target.value);
  }

  const onSubmit = async () => {
    console.log('submit short url', url);

    try {
      const response = await axios.post('http://localhost:8001/api/short-url', {
        url,
      });

      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TextField
        label="Enter a URL to shorten"
        variant="filled"
        fullWidth
        onChange={onChangeUrl}
        value={url}
      />
      <Button variant="contained" onClick={onSubmit}>Go!</Button>
    </>
  )
}

export default CreateShortUrlForm;
