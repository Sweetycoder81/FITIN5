import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile, updatePassword, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile update validation schema
  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string(),
    address: Yup.string(),
    fitnessGoals: Yup.string(),
    healthConditions: Yup.string()
  });

  // Password update validation schema
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Profile</h1>
      
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="text-center mb-3">
                <div className="profile-avatar mb-3">
                  <img
                    src={user.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
                    alt={user.name}
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <h4>{user.name}</h4>
                <p className="text-muted">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <hr />
              
              <div className="profile-nav">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <i className="fas fa-user me-2"></i> Profile Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                      onClick={() => setActiveTab('password')}
                    >
                      <i className="fas fa-lock me-2"></i> Change Password
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'membership' ? 'active' : ''}`}
                      onClick={() => setActiveTab('membership')}
                    >
                      <i className="fas fa-id-card me-2"></i> Membership
                    </button>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          {activeTab === 'profile' && (
            <Card>
              <Card.Header>
                <h4 className="mb-0">Profile Information</h4>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    fitnessGoals: user.fitnessGoals || '',
                    healthConditions: user.healthConditions || ''
                  }}
                  validationSchema={profileSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await updateProfile(values);
                      toast.success('Profile updated successfully');
                    } catch (error) {
                      toast.error(error.message || 'Failed to update profile');
                    } finally {
                      setSubmitting(false);
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
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.phone && errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.address && errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.address}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Fitness Goals</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="fitnessGoals"
                          value={values.fitnessGoals}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="What are your fitness goals?"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Health Conditions</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="healthConditions"
                          value={values.healthConditions}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Any health conditions we should know about?"
                        />
                      </Form.Group>
                      
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting || loading}
                        >
                          {isSubmitting || loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Updating...
                            </>
                          ) : (
                            'Update Profile'
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'password' && (
            <Card>
              <Card.Header>
                <h4 className="mb-0">Change Password</h4>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      await updatePassword(
                        values.currentPassword,
                        values.newPassword
                      );
                      toast.success('Password updated successfully');
                      resetForm();
                    } catch (error) {
                      toast.error(error.message || 'Failed to update password');
                    } finally {
                      setSubmitting(false);
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
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={values.currentPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.currentPassword && errors.currentPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.currentPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.newPassword && errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.confirmPassword && errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting || loading}
                        >
                          {isSubmitting || loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Updating...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'membership' && (
            <Card>
              <Card.Header>
                <h4 className="mb-0">Membership Details</h4>
              </Card.Header>
              <Card.Body>
                {user.membership ? (
                  <div>
                    <Alert variant="success">
                      <h5>Active Membership</h5>
                      <p>
                        You have an active membership plan that expires on{' '}
                        <strong>
                          {new Date(user.membershipExpiry).toLocaleDateString()}
                        </strong>
                      </p>
                    </Alert>
                    
                    <div className="membership-details mt-4">
                      <h5>Membership Benefits</h5>
                      <ul>
                        <li>Access to all fitness classes</li>
                        <li>Personal training sessions</li>
                        <li>Nutrition consultation</li>
                        <li>Access to premium content</li>
                      </ul>
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                      <Button variant="outline-primary" href="/memberships">
                        View All Plans
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Alert variant="warning">
                      <h5>No Active Membership</h5>
                      <p>
                        You don't have an active membership plan. Subscribe to a plan to
                        access premium features and classes.
                      </p>
                    </Alert>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                      <Button variant="primary" href="/memberships">
                        Browse Membership Plans
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;