import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function App() {
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
      console.log(error)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter a URL to shorten:</Form.Label>
              <Form.Control
                type="text"
                name="url"
                placeholder="http://www.google.com/"
                value={values.url}
                onChange={handleChange}
                isValid={touched.url && !errors.url}
              />
              <Form.Control.Feedback>
                {errors.url}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Shorten
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

export default App;
