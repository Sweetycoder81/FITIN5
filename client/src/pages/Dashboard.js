import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaCalendarAlt, FaUserCircle, FaCreditCard } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Spinner from '../components/ui/Spinner';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const res = await api.get('/users/me/classes');
        setEnrolledClasses(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your enrolled classes');
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="py-5">
      <Container>
        <h1 className="mb-4">Dashboard</h1>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={6} className="mb-4">
                <Card className="stat-card">
                  <Card.Body>
                    <h5 className="text-muted mb-2">Membership Status</h5>
                    <h3>{user?.activeMembership ? 'Active' : 'None'}</h3>
                    <p className="mb-0">
                      {user?.activeMembership 
                        ? `Your ${user.activeMembership.name} plan expires in 30 days` 
                        : 'No active membership'}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="stat-card">
                  <Card.Body>
                    <h5 className="text-muted mb-2">Enrolled Classes</h5>
                    <h3>{enrolledClasses.length}</h3>
                    <p className="mb-0">
                      {enrolledClasses.length > 0 
                        ? 'Keep up the good work!' 
                        : 'Explore classes to get started'}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">My Enrolled Classes</h5>
              </Card.Header>
              <Card.Body>
                {error && <p className="text-danger">{error}</p>}
                
                {enrolledClasses.length === 0 ? (
                  <div className="text-center py-4">
                    <FaDumbbell size={40} className="text-muted mb-3" />
                    <h5>No Classes Enrolled</h5>
                    <p className="mb-4">You haven't enrolled in any classes yet.</p>
                    <Button as={Link} to="/classes" variant="primary">
                      Browse Classes
                    </Button>
                  </div>
                ) : (
                  <Row>
                    {enrolledClasses.map((classItem) => (
                      <Col md={6} key={classItem._id} className="mb-3">
                        <Card className="h-100">
                          <Row className="g-0">
                            <Col xs={4}>
                              <img 
                                src={classItem.image || 'https://source.unsplash.com/random/300x200/?fitness'} 
                                alt={classItem.name} 
                                className="img-fluid rounded-start h-100"
                                style={{ objectFit: 'cover' }}
                              />
                            </Col>
                            <Col xs={8}>
                              <Card.Body>
                                <Card.Title className="h6">{classItem.name}</Card.Title>
                                <Card.Text className="small mb-2">
                                  <FaCalendarAlt className="me-1" /> {new Date(classItem.createdAt).toLocaleDateString()}
                                </Card.Text>
                                <Button 
                                  as={Link} 
                                  to={`/classes/${classItem._id}`} 
                                  variant="outline-primary" 
                                  size="sm"
                                >
                                  Start Workout
                                </Button>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button as={Link} to="/classes" variant="outline-primary">
                    <FaDumbbell className="me-2" /> Browse Classes
                  </Button>
                  <Button as={Link} to="/profile" variant="outline-primary">
                    <FaUserCircle className="me-2" /> Update Profile
                  </Button>
                  <Button as={Link} to="/memberships" variant="outline-primary">
                    <FaCreditCard className="me-2" /> Manage Membership
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="bg-white">
                <h5 className="mb-0">Fitness Goals</h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">
                  <strong>Current Goal:</strong> {user?.fitnessGoals || 'Not set'}
                </p>
                <div className="mb-3">
                  <h6>Recommended Classes:</h6>
                  <ul className="list-unstyled">
                    {user?.fitnessGoals === 'Weight Loss' ? (
                      <>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">HIIT Cardio Blast</Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">Fat Burning Express</Link>
                        </li>
                      </>
                    ) : user?.fitnessGoals === 'Muscle Gain' ? (
                      <>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">Strength Builder</Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">Muscle Pump</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">Full Body Workout</Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/classes" className="text-decoration-none">Core Strength</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <Button as={Link} to="/profile" variant="link" className="p-0">
                  Update your fitness goals
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;