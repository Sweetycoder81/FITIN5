import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { getAllTrainers, deleteTrainer, createTrainer, updateTrainer } from '../../services/trainerService';
import { toast } from 'react-toastify';

const AdminTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', specialty: '', bio: '', experience: 1, photo: '' });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await getAllTrainers();
      setTrainers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load trainers');
      setLoading(false);
    }
  };

  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!trainerToDelete) return;
    
    try {
      setDeleting(true);
      await deleteTrainer(trainerToDelete._id);
      setTrainers(trainers.filter(t => t._id !== trainerToDelete._id));
      toast.success('Trainer deleted successfully');
      setShowDeleteModal(false);
      setDeleting(false);
    } catch (error) {
      toast.error(error.message || 'Failed to delete trainer');
      setDeleting(false);
    }
  };

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trainer.specialty || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingTrainer(null);
    setForm({ name: '', specialty: '', bio: '', experience: 1, photo: '' });
    setShowModal(true);
  };

  const openEdit = (trainer) => {
    setEditingTrainer(trainer);
    setForm({
      name: trainer.name || '',
      specialty: trainer.specialty || '',
      bio: trainer.bio || '',
      experience: trainer.experience || 1,
      photo: trainer.photo || ''
    });
    setShowModal(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'experience' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...form };
      if (editingTrainer) {
        const res = await updateTrainer(editingTrainer._id, payload);
        const updated = res.data;
        setTrainers((prev) => prev.map((t) => (t._id === editingTrainer._id ? updated : t)));
        toast.success('Trainer updated');
      } else {
        const res = await createTrainer(payload);
        setTrainers((prev) => [res.data, ...prev]);
        toast.success('Trainer created');
      }
      setShowModal(false);
      setSaving(false);
    } catch (err) {
      toast.error(err.message || 'Save failed');
      setSaving(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <Card>
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Manage Trainers</h5>
            <Button variant="primary" size="sm" onClick={openCreate}>
              <i className="fas fa-plus me-1"></i> Add New Trainer
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.length > 0 ? (
                  filteredTrainers.map((trainer) => (
                    <tr key={trainer._id}>
                      <td>
                        <img
                          src={trainer.photo || 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&auto=format&fit=crop'}
                          alt={trainer.name}
                          width="50"
                          height="50"
                          className="rounded-circle"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td>{trainer.name}</td>
                      <td>{trainer.specialty}</td>
                      <td>{trainer.experience} years</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm" onClick={() => openEdit(trainer)}>
                            update
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClick(trainer)}
                          >
                            Delete
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No trainers found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the trainer "{trainerToDelete?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} disabled={deleting}>
            {deleting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTrainer ? 'Edit Trainer' : 'Create Trainer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialty</Form.Label>
              <Form.Control type="text" name="specialty" value={form.specialty} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" name="bio" value={form.bio} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="number" name="experience" value={form.experience} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" name="photo" value={form.photo} onChange={onChange} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Saving...
                </>
              ) : (
                editingTrainer ? 'Update' : 'Create'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminTrainers;