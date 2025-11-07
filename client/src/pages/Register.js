import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

const Register = () => {
  const [showError, setShowError] = useState(false);
  const { register, error, isAuthenticated, clearErrors } = useContext(AuthContext);
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
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7}$/,
        'Password must be exactly 7 characters with at least 1 uppercase, 1 lowercase, and 1 number'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    age: Yup.number()
      .required('Age is required')
      .min(16, 'You must be at least 16 years old')
      .max(100, 'Age must be less than 100'),
    fitnessGoals: Yup.string()
      .required('Please select your fitness goal')
  });

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="auth-form">
              <h2 className="text-center mb-4">Create Your Account</h2>
              
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ 
                  name: '', 
                  email: '', 
                  password: '', 
                  confirmPassword: '',
                  age: '',
                  fitnessGoals: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const userData = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    age: values.age,
                    fitnessGoals: values.fitnessGoals
                  };
                  
                  const success = await register(userData);
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
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

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

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.confirmPassword && errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="number"
                            name="age"
                            placeholder="Enter your age"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.age && errors.age}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.age}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Fitness Goals</Form.Label>
                          <Form.Select
                            name="fitnessGoals"
                            value={values.fitnessGoals}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.fitnessGoals && errors.fitnessGoals}
                          >
                            <option value="">Select your goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Improved Fitness">Improved Fitness</option>
                            <option value="Stress Reduction">Stress Reduction</option>
                            <option value="Better Health">Better Health</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.fitnessGoals}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid mt-4">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mb-3"
                      >
                        {isSubmitting ? <Spinner /> : 'Create Account'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              <hr className="my-4" />

              <div className="text-center">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;