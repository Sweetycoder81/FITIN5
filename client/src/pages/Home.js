import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClock, FaDumbbell, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  // Featured class images (array of 3)
  const featuredImages = [
    'https://i.ytimg.com/vi/4AJmpGGIjnI/maxresdefault.jpg',
    'https://tse2.mm.bing.net/th/id/OIP.Sp0VKwm29oVG4Amq4vJvDAHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://cdn.mos.cms.futurecdn.net/oveu9mjQcNod2gCM96kz8W.jpg'
  ];

  // Trainer images (array of 3)
  const trainerImages = [
    'https://nationalpti.org/wp-content/uploads/2014/02/Personal-Trainer.jpg',
    'https://media.istockphoto.com/id/675179390/photo/muscular-trainer-writing-on-clipboard.jpg?s=612x612&w=0&k=20&c=9NKx1AwVMpPY0YBlk5H-hxx2vJSCu1Wc78BKRM9wFq0=',
    'https://www.mmagyms.net/wp-content/uploads/2020/01/Personal-Trainer-Packages.png'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={6} className="text-white">
              <h1 className="display-4 fw-bold mb-4">Transform Your Body in Just 5 Minutes a Day</h1>
              <p className="lead mb-4">
                Join FITIN5 and discover how our scientifically designed 5-minute workouts can help you achieve your fitness goals, no matter how busy your schedule is.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/register" variant="primary" size="lg">
                  Start Free Trial
                </Button>
                <Button as={Link} to="/classes" variant="outline-light" size="lg">
                  Explore Classes
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Why Choose FITIN5?</h2>
              <p className="lead">Our platform is designed to make fitness accessible to everyone</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaClock className="text-white" size={36} />
                </div>
                <h4>Quick Workouts</h4>
                <p>Just 5 minutes a day to transform your body and boost your energy levels</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaDumbbell className="text-white" size={36} />
                </div>
                <h4>Expert Trainers</h4>
                <p>Learn from certified fitness professionals with years of experience</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaUsers className="text-white" size={36} />
                </div>
                <h4>Community Support</h4>
                <p>Join a community of like-minded individuals on their fitness journey</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaChartLine className="text-white" size={36} />
                </div>
                <h4>Track Progress</h4>
                <p>Monitor your improvements and stay motivated with our tracking tools</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Classes */}
      <section className="section-padding">
        <Container>
          <Row className="mb-5">
            <Col lg={6}>
              <h2 className="fw-bold">Featured Classes</h2>
              <p className="lead">Discover our most popular 5-minute workout routines</p>
            </Col>
            <Col lg={6} className="text-lg-end">
              <Button as={Link} to="/classes" variant="outline-primary">
                View All Classes
              </Button>
            </Col>
          </Row>
          <Row>
            {featuredImages.map((img, idx) => (
              <Col lg={4} md={6} className="mb-4" key={idx}>
                <Card className="class-card h-100">
                  <Card.Img variant="top" src={img} />
                  <Card.Body>
                    <Card.Title>5-Minute {idx === 0 ? 'HIIT' : idx === 1 ? 'Core' : 'Strength'} Workout</Card.Title>
                    <Card.Text>
                      {idx === 0
                        ? 'High-intensity interval training to maximize calorie burn in just 5 minutes.'
                        : idx === 1
                        ? 'Strengthen your core and improve stability with this quick routine.'
                        : 'Build muscle and increase strength with these effective exercises.'}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        <FaClock className="me-1" /> 5 min
                      </span>
                      <Button as={Link} to="/classes" variant="primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Trainers Preview */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="mb-5">
            <Col lg={6}>
              <h2 className="fw-bold">Meet Our Trainers</h2>
              <p className="lead">Expert guidance from certified fitness professionals</p>
            </Col>
            <Col lg={6} className="text-lg-end">
              <Button as={Link} to="/trainers" variant="outline-primary">
                View All Trainers
              </Button>
            </Col>
          </Row>
          <Row>
            {trainerImages.map((img, idx) => (
              <Col lg={4} md={6} className="mb-4" key={idx}>
                <Card className="trainer-card h-100">
                  <Card.Img variant="top" src={img} />
                  <Card.Body className="text-center">
                    <Card.Title>
                      {idx === 0 ? 'Alex Johnson' : idx === 1 ? 'Sarah Williams' : 'Mike Thompson'}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {idx === 0 ? 'HIIT Specialist' : idx === 1 ? 'Yoga Instructor' : 'Strength Coach'}
                    </Card.Subtitle>
                    <Card.Text>
                      {idx === 0
                        ? '10+ years experience in high-intensity training and functional fitness.'
                        : idx === 1
                        ? 'Certified yoga instructor specializing in quick, effective routines.'
                        : 'Expert in strength training and muscle development techniques.'}
                    </Card.Text>
                    <Button as={Link} to="/trainers" variant="outline-primary">
                      View Profiles
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white text-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">Ready to Transform Your Fitness in Just 5 Minutes a Day?</h2>
              <p className="lead mb-4">
                Join thousands of members who have already discovered the power of quick, effective workouts.
              </p>
              <Button as={Link} to="/register" variant="light" size="lg" className="me-2">
                Start Free Trial
              </Button>
              <Button as={Link} to="/memberships" variant="outline-light" size="lg">
                View Membership Plans
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;