import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Spinner, Form, Row, Col, Badge } from 'react-bootstrap';
import { getAllUsers } from '../../services/userService';
import { toast } from 'react-toastify';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        setUsers(res.data || []);
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    );
  });

  const membershipStatus = (u) => {
    const hasMembership = !!u.membership;
    const active = hasMembership && u.membershipExpiry && new Date(u.membershipExpiry) > new Date();
    if (active) return <Badge bg="success">Active</Badge>;
    if (hasMembership) return <Badge bg="secondary">Expired</Badge>;
    return <Badge bg="light" text="dark">None</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <Card>
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col><h5 className="mb-0">Users</h5></Col>
            <Col md="4">
              <Form.Control
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Selected Plan</th>
                  <th>Status</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? (
                  filtered.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name || '-'}</td>
                      <td>{u.email || '-'}</td>
                      <td>{typeof u.membership === 'object' ? (u.membership?.name || u.membership?._id) : (u.membership || '-')}</td>
                      <td>{membershipStatus(u)}</td>
                      <td>{u.membershipExpiry ? new Date(u.membershipExpiry).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
