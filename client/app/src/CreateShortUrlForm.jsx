import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreateShortUrlForm() {
  const [url, setUrl] = useState('');

  const onChangeUrl = (event) => {
    setUrl(event.target.value);
  }

  const onSubmit = () => {
    console.log('submit short url', url);
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
