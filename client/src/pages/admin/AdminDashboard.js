import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    classCount: 0,
    trainerCount: 0,
    membershipCount: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, classesRes, trainersRes, membershipsRes] = await Promise.all([
          api.get('/users'),
          api.get('/classes'),
          api.get('/trainers'),
          api.get('/memberships')
        ]);

        const users = usersRes.data.data || [];
        const classes = classesRes.data.data || [];
        const trainers = trainersRes.data.data || [];
        const memberships = membershipsRes.data.data || [];

        setStats({
          userCount: users.length,
          classCount: classes.length,
          trainerCount: trainers.length,
          membershipCount: memberships.length,
          recentUsers: users.slice(0, 5)
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Users</h6>
                  <h3>{stats.userCount}</h3>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <Link to="/dashboard/users">
                <Button variant="link" className="p-0">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Classes</h6>
                  <h3>{stats.classCount}</h3>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
              </div>
              <Link to="/dashboard/classes">
                <Button variant="link" className="p-0">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Trainers</h6>
                  <h3>{stats.trainerCount}</h3>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
              </div>
              <Link to="/dashboard/trainers">
                <Button variant="link" className="p-0">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Membership Plans</h6>
                  <h3>{stats.membershipCount}</h3>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-id-card"></i>
                </div>
              </div>
              <Link to="/dashboard/memberships">
                <Button variant="link" className="p-0">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Users */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Users</h5>
              <Link to="/dashboard/users">
                <Button variant="link" size="sm">View All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-${user.active ? 'success' : 'danger'}`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {stats.recentUsers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No recent users
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        
      </Row>
    </Container>
  );
};

export default AdminDashboard;