import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

const Login = () => {
  const [showError, setShowError] = useState(false);
  const { login, error, isAuthenticated, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Show error if exists
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        clearErrors();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, error, clearErrors]);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="auth-form">
              <h2 className="text-center mb-4">Login to Your Account</h2>
              
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const success = await login(values.email, values.password);
                  setSubmitting(false);
                  if (success) {
                    navigate('/dashboard');
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mb-3"
                      >
                        {isSubmitting ? <Spinner /> : 'Login'}
                      </Button>
                    </div>

                    <div className="text-center mt-3">
                      <Link to="/forgot-password" className="text-decoration-none">
                        Forgot Password?
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>

              <hr className="my-4" />

              <div className="text-center">
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary">
                  Create Account
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;