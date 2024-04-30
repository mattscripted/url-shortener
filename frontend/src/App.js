import { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function App() {
  const [toastState, setToastState] = useState({
    isVisible: false,
    header: '',
    body: '',
  });

  const showToast = ({ header, body }) => {
    setToastState({
      isVisible: true,
      header,
      body,
    });
  };

  const hideToast = () => {
    setToastState({
      isVisible: false,
      header: '',
      body: '',
    });
  };

  const initialValues = {
    url: '',
  };
  const validationSchema = Yup.object().shape({
    url: Yup.string().url('Invalid URL').required('Required'),
  });

  const handleSubmit = async (values) => {
    console.log('submit form', values);
    const { url } = values;

    try {
      const response = await axios.post('http://localhost:8000/api/short-url', {
        url,
      });

      console.log(response);
    } catch (error) {
      showToast({
        header: 'Create a short URL',
        body: 'The short URL could not be created. Please try again.'
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <>
          <Container>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formUrl">
                <Form.Label>Enter a URL to shorten:</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="http://www.google.com/"
                  value={values.url}
                  onChange={handleChange}
                  isInvalid={!!errors.url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Shorten
              </Button>
            </Form>
          </Container>
          <ToastContainer position="top-end">
            <Toast show={toastState.isVisible} onClose={hideToast} autohide>
              <Toast.Header closeButton={false}>
                {toastState.header}
              </Toast.Header>
              <Toast.Body>
              {toastState.body}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </>
      )}
    </Formik>
  );
}

export default App;
