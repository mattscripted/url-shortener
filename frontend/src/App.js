import { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function getShortUrlFromHash(shortUrlHash) {
  return `${process.env.REACT_APP_BACKEND_URL}/${shortUrlHash}`;
}

function App() {
  const [shortUrlHash, setShortUrlHash] = useState('');

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
    const { url } = values;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/short-url`, {
        url,
      });
      const shortUrlHash = response.data.data.id;
      setShortUrlHash(shortUrlHash);
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
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <>
          <Container>
            <h1>URL Shortener</h1>
            <Card body>
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col xs={12} sm={9}>
                    <Form.Group controlId="formUrl">
                      <Form.Control
                        type="text"
                        name="url"
                        aria-label="Enter a URL to shorten"
                        placeholder="Enter a URL to shorten, e.g. http://www.google.com/"
                        value={values.url}
                        onChange={handleChange}
                        isInvalid={!!errors.url}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.url}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={3}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      Shorten
                    </Button>
                  </Col>
                </Row>
                {shortUrlHash ? (
                  <Alert>
                    <p>Your short URL can be accessed here:</p>
                    <a href={getShortUrlFromHash(shortUrlHash)}>{getShortUrlFromHash(shortUrlHash)}</a>
                  </Alert>
                ) : null}
              </Form>
            </Card>
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
