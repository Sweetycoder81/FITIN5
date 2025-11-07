import React, { useState } from 'react';
import { submitContact } from '../services/contactService';
import { toast } from 'react-toastify';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
      if (!payload.name || !payload.email || !payload.message) {
        toast.warn('Please fill in all fields');
        setSubmitting(false);
        return;
      }
      await submitContact(payload);
      toast.success('Message sent successfully');
      setForm({ name: '', email: '', message: '' });
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.error || 'Failed to send message');
      setSubmitting(false);
    }
  };
  return (
    <div className="section-padding container">
      <h1 className="text-center mb-5">Contact Us</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" value={form.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" name="message" rows="4" value={form.message} onChange={onChange} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send'}</button>
      </form>
    </div>
  );
}
