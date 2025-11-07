import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="mb-3">Start Your Fitness Journey Today!</h1>
            <ul className="mb-3">
              <li>Unlimited gym and class access</li>
              <li>Personalized training plans</li>
              <li>Expert trainer support</li>
            </ul>
            <div className="text-muted mb-2">
              Cancel anytime · Money-back guarantee · Trusted by 1,000+ members
            </div>
            <div className="small text-muted">
              Limited spots available — join now for a special offer!
            </div>
            <div className="d-flex gap-3 mt-4">
              <Button as={Link} to="/register" variant="primary" size="lg">Subscribe Now</Button>
              <Button as={Link} to="/memberships" variant="outline-primary" size="lg">View Plans</Button>
            </div>
            <div className="small mt-3">
              By subscribing, you agree to our <Link to="/terms-of-service">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.
            </div>
            <div className="small mt-2">
              Need help? Email support@yourgym.com
            </div>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt="Gym"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Subscribe;
