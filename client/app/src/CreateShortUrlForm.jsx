import React, { useState } from 'react';
import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const validationSchema = Yup.object().shape({
  url: Yup.string().url('Invalid URL').required('Required'),
});

function CreateShortUrlForm() {
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { url } = values;
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
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="url"
        name="url"
        label="Enter a URL to shorten"
        value={formik.values.url}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.url && Boolean(formik.errors.url)}
        helperText={formik.touched.url && formik.errors.url}
        variant="filled"
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
      >
        Shorten!
      </Button>
    </form>
  )
}

export default CreateShortUrlForm;
