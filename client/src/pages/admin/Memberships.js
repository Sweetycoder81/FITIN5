import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Table, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { 
  getAllMemberships,
  createMembership,
  updateMembership,
  deleteMembership
} from '../../services/membershipService';

const AdminMemberships = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({ name: '', duration: 1, price: 0, features: '' });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getAllMemberships();
        setPlans(res.data || []);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load membership plans');
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const openCreate = () => {
    setEditingPlan(null);
    setForm({ name: '', duration: 1, price: 0, features: '' });
    setShowModal(true);
  };

  const openEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name || '',
      duration: plan.duration || 1,
      price: plan.price || 0,
      features: (plan.features || []).join(', ')
    });
    setShowModal(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'duration' || name === 'price' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        name: form.name.trim(),
        duration: Number(form.duration),
        price: Number(form.price),
        features: form.features
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      };

      if (editingPlan) {
        const res = await updateMembership(editingPlan._id, payload);
        const updated = res.data;
        setPlans((prev) => prev.map((p) => (p._id === editingPlan._id ? updated : p)));
        toast.success('Plan updated');
      } else {
        const res = await createMembership(payload);
        setPlans((prev) => [res.data, ...prev]);
        toast.success('Plan created');
      }
      setShowModal(false);
      setSaving(false);
    } catch (err) {
      toast.error(err.message || 'Save failed');
      setSaving(false);
    }
  };

  const onDelete = async (plan) => {
    if (!window.confirm(`Delete plan "${plan.name}"?`)) return;
    try {
      setDeleting(true);
      await deleteMembership(plan._id);
      setPlans((prev) => prev.filter((p) => p._id !== plan._id));
      toast.success('Plan deleted');
      setDeleting(false);
    } catch (err) {
      toast.error(err.message || 'Delete failed');
      setDeleting(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <Card>
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Membership Plans</h5>
          <Button variant="primary" size="sm" onClick={openCreate}>
            <i className="fas fa-plus me-1"></i> Add New Plan
          </Button>
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
                  <th>Duration (months)</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <tr key={plan._id}>
                      <td>{plan.name}</td>
                      <td>{plan.duration}</td>
                      <td>${Number(plan.price).toFixed(2)}</td>
                      <td>
                        {(plan.features || []).length > 0 ? (
                          <ul className="mb-0">
                            {plan.features.map((f, idx) => (
                              <li key={`${plan._id}-f-${idx}`}>{f}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm" onClick={() => openEdit(plan)}>update
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => onDelete(plan)} disabled={deleting}>Delete
                            
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No plans found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Duration (months)</Form.Label>
                  <Form.Control type="number" min={1} name="duration" value={form.duration} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" min={0} step="0.01" name="price" value={form.price} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Features (comma separated)</Form.Label>
                  <Form.Control as="textarea" rows={3} name="features" value={form.features} onChange={onChange} placeholder="Access to beginner classes, Community support" />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminMemberships;
