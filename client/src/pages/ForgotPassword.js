import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const onSubmit = e => { e.preventDefault(); };
  return (
    <div className="section-padding container">
      <h1>Forgot Password</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Send reset link</button>
      </form>
    </div>
  );
}
