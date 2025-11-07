import React, { useEffect, useState, useContext } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Spinner, 
  Alert, 
  Modal,
  ListGroup,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMembershipById, subscribeToPlan } from '../services/membershipService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';

const MembershipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUser } = useContext(AuthContext);

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await getMembershipById(id);
        if (res.success) {
          setMembership(res.data);
        } else {
          throw new Error(res.message || 'Failed to load membership details');
        }
      } catch (err) {
        console.error('Error fetching membership:', err);
        setError(err.message || 'Failed to load membership details. Please try again later.');
        toast.error('Failed to load membership details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMembership();
    } else {
      setError('No membership ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to continue');
      navigate('/login', { state: { from: `/memberships/${id}` } });
      return;
    }
    
    // Check if user already has this membership
    if (user?.membership === id) {
      toast.info('You are already subscribed to this membership plan.');
      return;
    }
    
    setShowConfirm(true);
  };

  const confirmSubscription = async () => {
    if (!isAuthenticated || !membership) {
      toast.error('Please log in to subscribe');
      return;
    }
    
    setSubscribing(true);
    
    try {
      // Play confirmation sound
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime);
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        o.start(ctx.currentTime);
        o.stop(ctx.currentTime + 0.15);
      } catch (e) {
        console.log('Audio not supported');
      }

      // Prepare subscription data
      const subscriptionData = {
        membershipId: id,
        paymentMethod: paymentMethod || 'card', // Default to card if not specified
        amount: membership.price,
        currency: 'USD'
      };

      // Call the subscription API
      const response = await subscribeToPlan(subscriptionData);
      
      if (response.success) {
        // Update user context with new membership
        if (updateUser && response.data?.user) {
          updateUser(response.data.user);
        }
        
        // Show success message
        toast.success('Successfully subscribed to the plan!');
        setShowSuccess(true);
        setShowConfirm(false);
      } else {
        throw new Error(response.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to process subscription. Please try again.');
    } finally {
      setSubscribing(false);
    }
      if (response.success) {
        // Update user context if needed
        if (updateUser && response.data?.user) {
          updateUser(response.data.user);
        }
        
        // Show success message
        toast.success('Successfully subscribed to the plan!');
        setShowSuccess(true);
        setShowConfirm(false);
        
        // Optional: Redirect after a delay or keep on the page
        // setTimeout(() => {
        //   navigate('/profile/membership');
        // }, 2000);
      } else {
        throw new Error(response.message || 'Subscription failed');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      toast.error(err.message || 'Failed to process subscription. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!membership) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Membership not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col lg={12}>
          <Button 
            variant="link" 
            onClick={() => navigate(-1)}
            className="px-0 mb-3 d-inline-flex align-items-center"
          >
            <FaArrowLeft className="me-2" /> Back to Memberships
          </Button>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h1 className="mb-2">{membership.name}</h1>
                {membership.isPopular && (
                  <Badge bg="warning" text="dark" className="mb-3">
                    Most Popular
                  </Badge>
                )}
                <p className="lead">{membership.description || 'Premium membership plan'}</p>
                <h2 className="text-primary">${membership.price}<small className="text-muted">/{membership.duration}</small></h2>
              </div>

              <div className="mb-4">
                <h4 className="mb-3 d-flex align-items-center">
                  Plan Features
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>All features included in this plan</Tooltip>}
                  >
                    <span className="ms-2">
                      <FaInfoCircle className="text-muted" />
                    </span>
                  </OverlayTrigger>
                </h4>
                <ListGroup variant="flush" className="mb-4">
                  {membership.features?.map((feature, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                      <FaCheck className="text-success me-2" />
                      <span>{feature}</span>
                    </ListGroup.Item>
                  ))}
                  
                  {(!membership.features || membership.features.length === 0) && (
                    <ListGroup.Item className="text-muted fst-italic">
                      No features listed for this plan.
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>

              <div className="text-center mt-4 pt-3 border-top">
                <Button 
                  variant={membership.isPopular ? "primary" : "outline-primary"}
                  size="lg"
                  className={`px-5 py-3 ${membership.isPopular ? 'shadow' : ''}`}
                  onClick={handleSubscribe}
                  disabled={subscribing || user?.membership === id}
                >
                  {subscribing ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : user?.membership === id ? (
                    'Your Current Plan'
                  ) : (
                    'Get Started Now'
                  )}
                </Button>
                
                {user?.membership && user.membership !== id && (
                  <p className="text-muted mt-3 mb-0">
                    <small>You currently have an active membership. Subscribing will replace your current plan.</small>
                  </p>
                )}
                
                <p className="text-muted mt-3 mb-0">
                  <small>No long-term contracts. Cancel anytime.</small>
                </p>
              </div>
            </Card.Body>
          </Card>
          
          {/* Additional Information */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">What's Included</h5>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary">✓ Access to All Classes</h6>
                  <p className="text-muted small">Unlimited access to all group classes and workout sessions.</p>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary">✓ Personal Training</h6>
                  <p className="text-muted small">Includes {membership.personalTrainingSessions || 0} personal training sessions.</p>
                </Col>
                <Col md={6} className="mt-3">
                  <h6 className="text-primary">✓ Nutrition Plan</h6>
                  <p className="text-muted small">Customized nutrition plan from our experts.</p>
                </Col>
                <Col md={6} className="mt-3">
                  <h6 className="text-primary">✓ 24/7 Facility Access</h6>
                  <p className="text-muted small">Access to our facilities any time, any day.</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => !subscribing && setShowConfirm(false)} centered size="lg">
        <Modal.Header closeButton={!subscribing} closeVariant={subscribing ? 'white' : undefined}>
          <Modal.Title>Confirm Your Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subscribing ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" className="mb-3" />
              <h5>Processing your subscription...</h5>
              <p className="text-muted">Please wait while we set up your membership.</p>
            </div>
          ) : (
            <>
              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>{membership.name} Membership</span>
                  <strong>${membership.price}/{membership.duration}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Billing Cycle</span>
                  <span className="text-capitalize">{membership.billingCycle || 'Monthly'}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Due Today</span>
                  <span>${membership.price}</span>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mb-3">Select Payment Method</h6>
                <div className="d-flex gap-3 mb-3">
                  <Button 
                    variant={paymentMethod === 'card' ? 'primary' : 'outline-secondary'}
                    onClick={() => setPaymentMethod('card')}
                    className="flex-grow-1 text-start d-flex align-items-center"
                  >
                    <div className="me-3">
                      <i className="far fa-credit-card fa-2x"></i>
                    </div>
                    <div>
                      <div className="fw-bold">Credit/Debit Card</div>
                      <small className="d-block">Visa, Mastercard, Amex, Discover</small>
                    </div>
                  </Button>
                  <Button 
                    variant={paymentMethod === 'paypal' ? 'primary' : 'outline-secondary'}
                    onClick={() => setPaymentMethod('paypal')}
                    className="flex-grow-1 text-start d-flex align-items-center"
                  >
                    <div className="me-3">
                      <i className="fab fa-paypal fa-2x"></i>
                    </div>
                    <div>
                      <div className="fw-bold">PayPal</div>
                      <small className="d-block">Safe and secure</small>
                    </div>
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="border p-3 rounded">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Expiration Date</label>
                        <input type="text" className="form-control" placeholder="MM/YY" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" placeholder="123" required />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Name on Card</label>
                        <input type="text" className="form-control" placeholder="John Doe" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="border p-4 text-center">
                    <p>You'll be redirected to PayPal to complete your purchase securely.</p>
                    <img 
                      src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" 
                      alt="Check out with PayPal" 
                      className="img-fluid"
                      style={{maxWidth: '200px'}}
                    />
                  </div>
                )}
              </div>

              <div className="form-check mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="termsCheck" 
                  required 
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </label>
              </div>

              <div className="alert alert-warning small">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Your subscription will automatically renew at the end of each billing period. You can cancel anytime.
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowConfirm(false)}
            disabled={subscribing}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmSubscription}
            disabled={subscribing}
            className="px-4"
          >
            {subscribing ? 'Processing...' : `Pay $${membership.price} Now`}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subscription Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">Thank you! Your subscription to <strong>{membership.name}</strong> is confirmed.</p>
          <p className="mb-0">You can manage your membership from your account.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccess(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MembershipDetail;
