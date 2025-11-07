import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { getAllClasses, deleteClass, createClass, updateClass } from '../../services/classService';
import { getAllTrainers } from '../../services/trainerService';
import { toast } from 'react-toastify';

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: '', duration: 5, trainer: '' });

  useEffect(() => {
    fetchClasses();
    fetchTrainers();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getAllClasses();
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load classes');
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await getAllTrainers();
      setTrainers(res.data || []);
    } catch (err) {
      toast.error('Failed to load trainers');
    }
  };

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!classToDelete) return;
    
    try {
      setDeleting(true);
      await deleteClass(classToDelete._id);
      setClasses(classes.filter(c => c._id !== classToDelete._id));
      toast.success('Class deleted successfully');
      setShowDeleteModal(false);
      setDeleting(false);
    } catch (error) {
      toast.error(error.message || 'Failed to delete class');
      setDeleting(false);
    }
  };

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (classItem.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingClass(null);
    setForm({ name: '', description: '', image: '', duration: 5, trainer: '' });
    setShowModal(true);
  };

  const openEdit = (cls) => {
    setEditingClass(cls);
    setForm({
      name: cls.name || '',
      description: cls.description || '',
      image: cls.image || '',
      duration: cls.duration || 5,
      trainer: cls.trainer?._id || cls.trainer || ''
    });
    setShowModal(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'duration' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...form };
      if (editingClass) {
        const res = await updateClass(editingClass._id, payload);
        const updated = res.data;
        setClasses((prev) => prev.map((c) => (c._id === editingClass._id ? updated : c)));
        toast.success('Class updated');
      } else {
        const res = await createClass(payload);
        setClasses((prev) => [res.data, ...prev]);
        toast.success('Class created');
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
            <h5 className="mb-0">Manage Classes</h5>
            <Button variant="primary" size="sm" onClick={openCreate}>
              <i className="fas fa-plus me-1"></i> Add New Class
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search classes..."
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Trainer</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <tr key={classItem._id}>
                      <td>
                        <img
                          src={classItem.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop'}
                          alt={classItem.name}
                          width="50"
                          height="50"
                          className="rounded"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td>{classItem.name}</td>
                      <td>{classItem.trainer?.name || 'Not Assigned'}</td>
                      <td>{classItem.duration} mins</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm" onClick={() => openEdit(classItem)}>update
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClick(classItem)}
                          >Delete
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No classes found
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
          Are you sure you want to delete the class "{classToDelete?.name}"? This action cannot be undone.
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
          <Modal.Title>{editingClass ? 'Edit Class' : 'Create Class'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={onChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Duration (mins)</Form.Label>
                  <Form.Control type="number" min={1} name="duration" value={form.duration} onChange={onChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Trainer</Form.Label>
                  <Form.Select name="trainer" value={form.trainer} onChange={onChange}>
                    <option value="">Unassigned</option>
                    {trainers.map((t) => (
                      <option key={t._id} value={t._id}>{t.name} - {t.specialty}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" value={form.image} onChange={onChange} placeholder="https://..." />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3 d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving...' : (editingClass ? 'Update' : 'Create')}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminClasses;