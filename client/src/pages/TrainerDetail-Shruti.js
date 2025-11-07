import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { getTrainerById } from '../services/trainerService';
import { toast } from 'react-toastify';

export default function TrainerDetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const res = await getTrainerById(id);
        setTrainer(res.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to load trainer');
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!trainer) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Trainer not found</Alert>
      </Container>
    );
  }

  const fallbackPhoto = 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=800&auto=format&fit=crop';
  const photo = trainer.photo || fallbackPhoto;
  const title = trainer.title || trainer.specialty || 'Certified Fitness Coach';

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={4} className="text-center mb-4 mb-md-0">
          <img
            src={photo}
            alt={trainer.name}
            className="img-fluid rounded"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackPhoto) {
                e.currentTarget.src = fallbackPhoto;
              }
            }}
          />
        </Col>
        <Col md={8}>
          <h1 className="mb-1">{trainer.name}</h1>
          <p className="text-muted">{title}</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {trainer.experience ? (
              <Badge bg="secondary">Experience: {trainer.experience} yrs</Badge>
            ) : null}
            {trainer.specialty ? (
              <Badge bg="info">Specialization: {trainer.specialty}</Badge>
            ) : null}
          </div>
          <Button variant="primary">Book a session</Button>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">About</h4>
              <p className="mb-0">{trainer.bio || 'Passionate about helping clients achieve their goals with personalized, sustainable training plans.'}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Training Philosophy</h4>
              <p className="mb-0">{trainer.philosophy || 'I focus on sustainable habits, proper form, and holistic wellness to deliver long-term results.'}</p>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Qualifications</h5>
                  <ul className="mb-0">
                    {(trainer.qualifications || []).length > 0 ? (
                      trainer.qualifications.map((q, i) => <li key={i}>{q}</li>)
                    ) : (
                      <li>NASM Certified Personal Trainer (example)</li>
                    )}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Specializations</h5>
                  <ul className="mb-0">
                    {(trainer.specializations || (trainer.specialty ? [trainer.specialty] : [])).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Testimonials</h4>
              <blockquote className="blockquote mb-0">
                <p>“Transformed my fitness in 3 months!”</p>
                <footer className="blockquote-footer">Happy Client</footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Contact</h5>
              <ul className="list-unstyled mb-0">
                <li><i className="fas fa-phone me-2"></i>{trainer.phone || '1234567890'}</li>
                {trainer.email ? <li><i className="fas fa-envelope me-2"></i>{trainer.email}</li> : null}
                {trainer.bookingLink ? (
                  <li><i className="fas fa-calendar-check me-2"></i><a href={trainer.bookingLink} target="_blank" rel="noreferrer">Book a session</a></li>
                ) : null}
                {trainer.socialMedia?.instagram ? (
                  <li><i className="fab fa-instagram me-2"></i><a href={trainer.socialMedia.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
                ) : null}
                {trainer.socialMedia?.twitter ? (
                  <li><i className="fab fa-twitter me-2"></i><a href={trainer.socialMedia.twitter} target="_blank" rel="noreferrer">Twitter</a></li>
                ) : null}
                {trainer.socialMedia?.linkedin ? (
                  <li><i className="fab fa-linkedin me-2"></i><a href={trainer.socialMedia.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
                ) : null}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
