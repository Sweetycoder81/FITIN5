import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="mb-5">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h3 className="text-white mb-4">
              <span className="text-primary">FIT</span>IN5
            </h3>
            <p>
              Transform your body and mind with our 5-minute fitness routines. 
              FITIN5 makes fitness accessible to everyone, regardless of your schedule.
            </p>
            <div className="d-flex mt-4">
              <a href="https://facebook.com" className="me-3 text-white" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" className="me-3 text-white" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="me-3 text-white" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-white" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">Classes</Link>
              </li>
              <li className="mb-2">
                <Link to="/trainers" className="text-white text-decoration-none">Trainers</Link>
              </li>
              <li className="mb-2">
                <Link to="/memberships" className="text-white text-decoration-none">Memberships</Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-white mb-4">Classes</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">HIIT Workouts</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">Strength Training</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">Cardio Blast</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">Yoga & Flexibility</Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-white text-decoration-none">Core Workouts</Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="me-3" />
                <span>123 Fitness Street, Workout City, WC 12345</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-3" />
                <span>info@fitin5.com</span>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row className="pt-3">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} FITIN5. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/terms-of-service" className="text-white text-decoration-none">Terms of Service</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;