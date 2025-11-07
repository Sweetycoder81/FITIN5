import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllTrainers } from '../services/trainerService';
import { toast } from 'react-toastify';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const data = await getAllTrainers();
      setTrainers(data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || 'Failed to load trainers');
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setFilter('');
    setSpecialtyFilter('');
    await fetchTrainers();
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Filter trainers based on search term and specialization
  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(filter.toLowerCase()) &&
      (specialtyFilter === '' || trainer.specialty === specialtyFilter)
  );

  // Get unique specializations for filter dropdown
  const specialties = [...new Set(trainers.map((trainer) => trainer.specialty))];

  // Rotating fallback images for trainers without photos
  const fallbackImages = [
    'https://img.freepik.com/premium-photo/fit-muscular-female-personal-trainer-is-holding-tablet-her-hands-smiling-gym_232070-15233.jpg',
    'https://img.freepik.com/premium-photo/young-muscular-man-trainer-modern-gym_358320-9010.jpg',
    'https://dubaipersonaltrainers.ae/wp-content/uploads/2023/11/Untitled-design-82.webp'
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Our Expert Trainers</h1>
      
      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search trainers..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="">All Specializations</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={1} className="mb-2 d-grid">
          <Button variant="outline-secondary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredTrainers.length === 0 ? (
        <div className="text-center my-5">
          <h3>No trainers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <Row>
          {filteredTrainers.map((trainer, index) => (
            <Col key={trainer._id} md={4} className="mb-4">
              <Card className="h-100 trainer-card">
                <div className="trainer-image-container">
                  <Card.Img
                    variant="top"
                    src={trainer.photo || fallbackImages[index % fallbackImages.length]}
                    alt={trainer.name}
                    className="trainer-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">{trainer.name}</Card.Title>
                  <div className="text-center mb-3">
                    <span className="trainer-specialization">{trainer.specialty || 'Fitness Coach'}</span>
                  </div>
                  <Card.Text>{(trainer.bio || '').substring(0, 100)}{(trainer.bio && trainer.bio.length > 100) ? '...' : ''}</Card.Text>
                  <div className="trainer-social text-center mb-3">
                    {trainer.socialMedia?.instagram && (
                      <a href={trainer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="me-2">
                        <i className="fab fa-instagram"></i>
                      </a>
                    )}
                    {trainer.socialMedia?.twitter && (
                      <a href={trainer.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="me-2">
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                    {trainer.socialMedia?.linkedin && (
                      <a href={trainer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <Link to={`/trainers/${trainer._id}`}>
                    <Button variant="outline-primary" className="w-100">
                      View Profile
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Trainers;