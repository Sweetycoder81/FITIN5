import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAllClasses } from '../services/classService';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  const [selectedClassId, setSelectedClassId] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const placeholderImg = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop';
  const resolveImage = (src) => {
    if (!src) return placeholderImg;
    if (/^https?:\/\//i.test(src)) return src;
    const base = process.env.REACT_APP_API_URL || '';
    return `${base}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  const handleRefresh = async () => {
    setFilter('');
    setSelectedClassId('');
    await fetchClasses();
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await getAllClasses();
      setClasses(data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || 'Failed to load classes');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Filter classes based on search term and category
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(filter.toLowerCase()) &&
      (selectedClassId === '' || cls._id === selectedClassId)
  );

  // Get unique categories for filter dropdown (filter out empty)
  const categories = [...new Set(classes.map((cls) => cls.category).filter(Boolean))];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Our Fitness Classes</h1>
      
      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search classes..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Form.Group>
        </Col>
      
        <Col md={4} className="mb-2">
          <Form.Group>
            <Form.Select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
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
      ) : filteredClasses.length === 0 ? (
        <div className="text-center my-5">
          <h3>No classes found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <Row>
          {filteredClasses.map((cls) => (
            <Col key={cls._id} md={4} className="mb-4">
              <Card className="h-100 class-card">
                <div className="class-image-container">
                  <Card.Img
                    variant="top"
                    src={resolveImage(cls.image || cls.photo)}
                    alt={cls.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImg; }}
                  />
                  {cls.category && (
                    <div className="class-category-badge">{cls.category}</div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{cls.name}</Card.Title>
                  <Card.Text className="text-muted">
                    <i className="fas fa-user-circle"></i> {cls.trainer?.name || 'TBA'}
                  </Card.Text>
                  <Card.Text>{(cls.description || '').substring(0, 100)}{(cls.description && cls.description.length > 100) ? '...' : ''}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="class-duration">
                      <i className="far fa-clock"></i> {cls.duration ?? 5} mins
                    </span>
                    <span className="class-level">{cls.level || 'Beginner'}</span>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <Button
                    as={Link}
                    to={`/classes/${cls._id}`}
                    variant="primary"
                    className="w-100"
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        navigate('/login', { state: { from: `/classes/${cls._id}` } });
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Classes;