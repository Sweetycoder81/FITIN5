import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getClassById, enrollInClass } from '../services/classService';
import { getTrainerById } from '../services/trainerService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [classData, setClassData] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/classes/${id}` } });
      return;
    }
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const response = await getClassById(id);
        setClassData(response.data);
        
        // Check if user is already enrolled
        if (isAuthenticated && user) {
          const userEnrolled = user.enrolledClasses?.some(
            (enrolledClass) => enrolledClass._id === id
          );
          setIsEnrolled(userEnrolled);
        }
        
        // Fetch trainer details if available (handle object or ID)
        if (response.data.trainer) {
          const trainerId =
            typeof response.data.trainer === 'object'
              ? response.data.trainer._id
              : response.data.trainer;
          if (trainerId) {
            const trainerResponse = await getTrainerById(trainerId);
            setTrainer(trainerResponse.data);
          }
        }
        
        setLoading(false);
      } catch (error) {
        toast.error(error.message || 'Failed to load class details');
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id, isAuthenticated, user]);

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
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
        g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
        o.start(ctx.currentTime);
        o.stop(ctx.currentTime + 0.3);
      } catch (e) {}
      alert('Time up!');
    }
  }, [seconds, running]);

  const startTimer = () => {
    if (seconds === 0) setSeconds(300);
    setRunning(true);
  };
  const stopTimer = () => setRunning(false);
  const resetTimer = () => { setRunning(false); setSeconds(300); };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to enroll in this class');
      navigate('/login', { state: { from: `/classes/${id}` } });
      return;
    }

    try {
      setEnrolling(true);
      await enrollInClass(id);
      setIsEnrolled(true);
      toast.success('Successfully enrolled in class!');
      setEnrolling(false);
    } catch (error) {
      toast.error(error.message || 'Failed to enroll in class');
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!classData) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Class not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <div className="class-detail-image mb-4">
            <img
              src={classData.image || classData.photo || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop'}
              alt={classData.name}
              className="img-fluid rounded"
            />
            <Badge bg="primary" className="class-category-large">
              {classData.category}
            </Badge>
          </div>
          <h1 className="mb-2">{classData.name}</h1>
          <p className="text-muted mb-3">{trainer?.name ? `Instructor: ${trainer.name}` : ''}</p>
          <p className="mb-4">{classData.shortDescription || classData.description}</p>
          <div className="d-flex flex-wrap mb-4">
            <Badge bg="secondary" className="me-2 mb-2">
              <i className="far fa-clock me-1"></i> {classData.duration} mins
            </Badge>
            <Badge bg="info" className="me-2 mb-2">
              <i className="fas fa-signal me-1"></i> Level: {classData.level || 'Beginner'}
            </Badge>
            {classData.capacity ? (
              <Badge bg="success" className="me-2 mb-2">
                <i className="fas fa-users me-1"></i> {classData.capacity} spots
              </Badge>
            ) : null}
          </div>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p className="mb-1"><strong>Focus:</strong> {classData.focus || 'Full Body'}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {classData.level || 'Beginner'}</p>
                  <p className="mb-1"><strong>Duration:</strong> {classData.duration || 5} mins</p>
                </Col>
                <Col md={6}>
                  <p className="mb-1"><strong>Equipment:</strong> {(classData.equipment || []).join(', ') || 'None'}</p>
                  <p className="mb-1"><strong>Benefits:</strong> {classData.benefits || 'Improve strength and stamina'}</p>
                  <p className="mb-1"><strong>Tips:</strong> {classData.tips || 'Maintain form and breathe steadily'}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <h4 className="mb-3">5-Minute Timer</h4>
              <div className="display-4 mb-3">{String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}</div>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="primary" onClick={startTimer} disabled={running}>Start</Button>
                <Button variant="outline-secondary" onClick={stopTimer} disabled={!running}>Stop</Button>
                <Button variant="outline-danger" onClick={resetTimer}>Reset</Button>
              </div>
            </Card.Body>
          </Card>
          {classData.routine && (
            <div className="mb-4">
              <h3 className="mb-3">Exercise Steps</h3>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th style={{width:'80px'}}>Step</th>
                    <th>Instruction</th>
                    <th style={{width:'120px'}}>Duration (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.routine.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title || item.description}</td>
                      <td>{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <div className="mb-4">
            <h3>Schedule</h3>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Days:</strong> {classData.schedule?.days?.length ? classData.schedule.days.join(', ') : '-'}</p>
                    <p><strong>Time:</strong> {classData.schedule?.startTime || '-'} - {classData.schedule?.endTime || '-'}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Location:</strong> {classData.location || '-'}</p>
                    <p><strong>Room:</strong> {classData.room || 'TBA'}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h3 className="card-title">Class Details</h3>
              <hr />
              <div className="mb-4">
                <h5>Price</h5>
                <p className="class-price">
                  {typeof classData.price === 'number' ? `$${classData.price.toFixed(2)}` : '-'}
                </p>
                {classData.membershipRequired ? (
                  <Badge bg="warning" text="dark">Membership Required</Badge>
                ) : null}
              </div>
              {trainer ? (
                <div className="mb-4">
                  <h5>Instructor</h5>
                  <Link to={`/trainers/${trainer._id}`} className="text-decoration-none text-reset">
                    <div className="d-flex align-items-center">
                      <img
                        src={trainer.photo || 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&auto=format&fit=crop'}
                        alt={trainer.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6 className="mb-0">{trainer.name}</h6>
                        <p className="text-muted mb-0">{trainer.specialty || trainer.specialization || 'Trainer'}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null}
              <div className="mb-4">
                <h5>Equipment Needed</h5>
                <ul className="list-unstyled">
                  {classData.equipment?.map((item, index) => (
                    <li key={index}><i className="fas fa-check-circle text-success me-2"></i>{item}</li>
                  ))}
                </ul>
              </div>
              {isEnrolled ? (
                <Alert variant="success"><i className="fas fa-check-circle me-2"></i>You are enrolled in this class</Alert>
              ) : (
                <Button variant="primary" size="lg" className="w-100" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  ) : null}
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
;

export default ClassDetails;