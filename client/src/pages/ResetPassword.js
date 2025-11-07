import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { resetToken } = useParams();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => { e.preventDefault(); };
  return (
    <div className="section-padding container">
      <h1>Reset Password</h1>
      <p>Token: {resetToken}</p>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input className="form-control" type="password" name="password" value={form.password} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input className="form-control" type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} />
        </div>
        <button className="btn btn-primary" type="submit">Reset</button>
      </form>
    </div>
  );
}
