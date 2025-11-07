import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getAllMemberships } from '../services/membershipService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        const data = await getAllMemberships();
        setMemberships(data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message || 'Failed to load membership plans');
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const handleSubscribe = (membershipId) => {
    if (!isAuthenticated) {
      toast.info('Please login to subscribe to a membership plan');
      navigate('/login', { state: { from: '/memberships' } });
      return;
    }
    
    // Navigate to payment page with membership ID
    navigate(`/payment/membership/${membershipId}`);
  };

  // Check if user has an active membership
  const hasActiveMembership = () => {
    if (!isAuthenticated || !user) return false;
    return user.membership && new Date(user.membershipExpiry) > new Date();
  };

  // Get user's current membership details
  const getCurrentMembership = () => {
    if (!hasActiveMembership()) return null;
    return memberships.find(m => m._id === user.membership);
  };

  const currentMembership = getCurrentMembership();

  return (
    <Container className="py-5">
      {/* Subscribe Now Hero Section */}
    

      <h1 className="text-center mb-3">Membership Plans</h1>
      <p className="text-center mb-5">Choose the perfect membership plan for your fitness journey</p>
      
      {hasActiveMembership() && currentMembership && (
        <div className="current-membership-alert mb-5">
          <div className="alert alert-success">
            <h4 className="alert-heading">Your Current Membership</h4>
            <p>
              You are currently subscribed to the <strong>{currentMembership.name}</strong> plan.
              Your membership expires on {new Date(user.membershipExpiry).toLocaleDateString()}.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : memberships.length === 0 ? (
        <div className="text-center my-5">
          <h3>No membership plans available</h3>
          <p>Please check back later</p>
        </div>
      ) : (
        <Row id="plans" className="justify-content-center">
          {memberships.map((membership) => (
            <Col key={membership._id} md={4} className="mb-4">
              <Card className={`h-100 membership-card ${membership.isPopular ? 'popular-plan' : ''}`}>
                {membership.isPopular && (
                  <div className="popular-badge">
                    <Badge bg="warning" text="dark">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card.Header className="text-center py-3">
                  <h3 className="membership-name mb-0">{membership.name}</h3>
                </Card.Header>
                <Card.Body>
                  <div className="text-center mb-4">
                    <h2 className="membership-price">
                      ${membership.price}
                      <span className="price-period">/{membership.duration}</span>
                    </h2>
                  </div>
                  
                  <ul className="membership-features text-start">
                    {membership.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-white border-0 text-center py-4">
                  <Button
                    variant={membership.isPopular ? "primary" : "outline-primary"}
                    size="lg"
                    className="w-100"
                    onClick={() => navigate(`/memberships/${membership._id}`)}
                  >
                    Subscribe Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      <div className="membership-info mt-5">
        <div className="text-center mb-2">
          <span className="badge rounded-pill text-bg-warning text-dark">Why Join</span>
        </div>
        <h3 className="text-center mb-4">Membership Benefits</h3>
        <div className="p-4 bg-light border rounded-3 shadow-sm">
          <Row>
            <Col md={4} className="mb-4">
              <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-primary border-opacity-25 text-center">
                <div className="mb-3 text-primary">
                  <i className="fas fa-dumbbell fa-3x"></i>
                </div>
                <h4 className="fw-bold">Unlimited Class Access</h4>
                <p className="text-muted mb-0">Access to <mark>all classes</mark> included in your plan, anytime.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-primary border-opacity-25 text-center">
                <div className="mb-3 text-primary">
                  <i className="fas fa-user-friends fa-3x"></i>
                </div>
                <h4 className="fw-bold">Personal Training</h4>
                <p className="text-muted mb-0">One-on-one sessions with our <mark>expert trainers</mark> to fast-track results.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-primary border-opacity-25 text-center">
                <div className="mb-3 text-primary">
                  <i className="fas fa-chart-line fa-3x"></i>
                </div>
                <h4 className="fw-bold">Progress Tracking</h4>
                <p className="text-muted mb-0">Stay motivated with <mark>clear insights</mark> and milestone tracking.</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Memberships;