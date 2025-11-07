import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { getAllTrainers } from '../services/trainerService';

export default function About() {
  const [trainers, setTrainers] = useState([]);
  const [loadingTrainers, setLoadingTrainers] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingTrainers(true);
        const res = await getAllTrainers();
        // API returns { success, count, data }
        setTrainers(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        // fail silently on About page
        setTrainers([]);
      } finally {
        setLoadingTrainers(false);
      }
    };
    load();
  }, []);

  const displayedTeam = (trainers || []).slice(0, 3);

  return (
    <>
      <section className="hero-section d-flex align-items-center" style={{minHeight:'40vh'}}>
        <Container>
          <Row>
            <Col md={8}>
              <h1 className="display-5 fw-bold">About FITIN5</h1>
              <p className="lead mt-3">We help busy people stay consistent with effective 5-minute fitness routines.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="section-padding">
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100 p-4">
              <h3 className="mb-3">Our Mission</h3>
              <p>Make fitness simple, fun, and sustainable. We design science-backed micro-workouts and guided classes that fit into your day.</p>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 p-4">
              <h3 className="mb-3">Our Vision</h3>
              <p>Build the most accessible fitness platform where anyone can start in 5 minutes—no excuses, just results.</p>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <Card className="p-4">
              <h3 className="mb-3">Our Story</h3>
              <p>Founded by trainers and technologists, FITIN5 began with a simple idea: small steps compound. We merged coaching expertise with engaging product design to help you build lasting habits.</p>
            </Card>
          </Col>
        </Row>

        {/* Our Fitness Classes */}
        <h3 className="mb-4 text-center">Our Fitness Classes</h3>
        <Row className="mb-5">
          {[
            'https://i.ytimg.com/vi/4AJmpGGIjnI/maxresdefault.jpg',
            'https://tse2.mm.bing.net/th/id/OIP.Sp0VKwm29oVG4Amq4vJvDAHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
            'https://cdn.mos.cms.futurecdn.net/oveu9mjQcNod2gCM96kz8W.jpg'
          ].map((img, idx) => (
            <Col md={4} className="mb-4" key={idx}>
              <Card className="h-100">
                <img alt={`Class ${idx+1}`} className="card-img-top" src={img} />
                <Card.Body>
                  <Card.Title>
                    {idx === 0 ? '5-Minute HIIT' : idx === 1 ? 'Core Blast' : 'Quick Strength'}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {idx === 0
                      ? 'High-intensity intervals designed to maximize calorie burn fast.'
                      : idx === 1
                      ? 'Tighten your core and improve stability in minutes.'
                      : 'Efficient strength moves to build muscle with minimal time.'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h3 className="mb-4 text-center">Meet the Team</h3>
        {loadingTrainers ? (
          <Row className="mb-5">
            <Col className="text-center text-muted">Loading trainers...</Col>
          </Row>
        ) : (
          <Row className="mb-5">
            {displayedTeam.length === 0 ? (
              <Col className="text-center text-muted">No trainers to display</Col>
            ) : (
              displayedTeam.map((t, idx) => {
                const defaultPhotos = [
                  'https://wallpaperaccess.com/full/2465473.jpg',
                  'https://tse3.mm.bing.net/th/id/OIP.upQu5_3NhTZv51O6qvNWMgHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
                  'https://wallpaperaccess.com/full/1484469.jpg'
                ];
                const photo = t?.photo || defaultPhotos[idx % defaultPhotos.length];
                const src = photo ? (photo.startsWith('http') ? photo : `/uploads/trainers/${photo}`) : null;
                return (
                  <Col md={4} className="mb-4" key={t._id || idx}>
                    <Card className="text-center h-100">
                      {src ? (
                        <img alt={t.name} className="card-img-top" src={src} style={{ height: 220, objectFit: 'cover' }} />
                      ) : (
                        <div className="card-img-top bg-light" style={{ height: 220 }} />
                      )}
                      <Card.Body>
                        <Card.Title>{t.name}</Card.Title>
                        <Card.Text className="text-muted">{t.specialty || 'Coach'}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        )}

        <h3 className="mb-4 text-center">What Members Say</h3>
        <Row>
          <Col md={{span:8, offset:2}}>
            <Carousel variant="dark">
              <Carousel.Item>
                <blockquote className="blockquote text-center p-4">
                  <p>“Five minutes turned into a habit. I’ve never been more consistent.”</p>
                  <footer className="blockquote-footer">Neha, Bangalore</footer>
                </blockquote>
              </Carousel.Item>
              <Carousel.Item>
                <blockquote className="blockquote text-center p-4">
                  <p>“Short, sweaty, effective. Perfect between meetings.”</p>
                  <footer className="blockquote-footer">Arjun, Pune</footer>
                </blockquote>
              </Carousel.Item>
              <Carousel.Item>
                <blockquote className="blockquote text-center p-4">
                  <p>“The routines and trainers are top-notch. I actually look forward to workouts.”</p>
                  <footer className="blockquote-footer">Sara, Delhi</footer>
                </blockquote>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
