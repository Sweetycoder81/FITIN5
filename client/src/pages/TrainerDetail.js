import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { getTrainerById } from '../services/trainerService';
import { toast } from 'react-toastify';

export default function TrainerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await getTrainerById(id);
        setTrainer(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching trainer:', err);
        setError('Failed to load trainer details. Please try again later.');
        toast.error('Failed to load trainer details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrainer();
    } else {
      setError('No trainer ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading trainer details...</p>
      </Container>
    );
  }

  if (error || !trainer) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || 'Trainer not found'}
          <div className="mt-2">
            <Link to="/trainers" className="btn btn-primary">
              Back to Trainers
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={12}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-link text-decoration-none mb-3"
          >
            &larr; Back to Trainers
          </button>
          <h1 className="mb-4">Trainer Profile</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="h-100">
            <div className="text-center p-4">
              <img
                src={trainer.photo || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop'}
                alt={trainer.name}
                className="rounded-circle mb-3"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <h2>{trainer.name}</h2>
              <h5 className="text-muted mb-3">{trainer.specialization || 'Fitness Coach'}</h5>
              
              <div className="mb-3">
                <Badge bg="primary" className="me-2 mb-2">
                  {trainer.experience || '5+'} Years Experience
                </Badge>
                {trainer.specialties?.map((specialty, index) => (
                  <Badge key={index} bg="secondary" className="me-2 mb-2">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="social-links mt-3">
                {trainer.socialMedia?.instagram && (
                  <a href={trainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                )}
                {trainer.socialMedia?.twitter && (
                  <a href={trainer.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                )}
                {trainer.socialMedia?.linkedin && (
                  <a href={trainer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                )}
              </div>
            </div>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="h-100">
            <Card.Body>
              <h4 className="mb-4">About Me</h4>
              <p className="mb-4">
                {trainer.bio || 'No biography available for this trainer.'}
              </p>

              <h5 className="mb-3">Specializations</h5>
              <div className="mb-4">
                {trainer.specialties?.length > 0 ? (
                  <ul className="list-unstyled">
                    {trainer.specialties.map((specialty, index) => (
                      <li key={index} className="mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No specializations listed.</p>
                )}
              </div>

              <h5 className="mb-3">Certifications</h5>
              {trainer.certifications?.length > 0 ? (
                <ul className="list-unstyled">
                  {trainer.certifications.map((cert, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-certificate text-primary me-2"></i>
                      {cert}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No certifications listed.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {trainer.classes && trainer.classes.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <h4 className="mb-4">Classes by {trainer.name.split(' ')[0]}</h4>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Class Name</th>
                        <th>Schedule</th>
                        <th>Level</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainer.classes.map((cls) => (
                        <tr key={cls._id}>
                          <td>{cls.name}</td>
                          <td>{cls.schedule}</td>
                          <td>
                            <span className={`badge bg-${cls.level === 'Beginner' ? 'success' : cls.level === 'Intermediate' ? 'warning' : 'danger'}`}>
                              {cls.level}
                            </span>
                          </td>
                          <td>
                            <Link to={`/classes/${cls._id}`} className="btn btn-sm btn-outline-primary">
                              View Class
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
