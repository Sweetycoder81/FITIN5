import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Spinner, Badge } from 'react-bootstrap';
import { getContacts } from '../../services/contactService';
import { toast } from 'react-toastify';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await getContacts();
        setContacts(res.data || []);
      } catch (err) {
        toast.error(err?.error || 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <Container fluid className="py-4">
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">Contact Submissions</h5>
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
                  <th>Message</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td style={{maxWidth: 420}}>
                        <div className="text-truncate" title={c.message}>{c.message}</div>
                      </td>
                      <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</td>
                      <td>
                        {c.isRead ? (
                          <Badge bg="success">Read</Badge>
                        ) : (
                          <Badge bg="secondary">New</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No contact submissions</td>
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
