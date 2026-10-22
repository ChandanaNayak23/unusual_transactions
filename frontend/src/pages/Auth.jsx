import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ErrorBox } from '../components/UI.jsx';

export function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  return (
    <div className="auth-wrap"><div className="card">
      <h1>Log in</h1>
      {location.state?.registered && <div className="success">Account created. Log in now.</div>}
      {err && <ErrorBox error={err} />}
      <form onSubmit={async (e) => { e.preventDefault(); try { await login(email, password); } catch (x) { setErr(x); } }}>
        <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button type="submit">Log in</button>
      </form>
      <p className="muted">No account? <Link to="/register">Create one</Link></p>
    </div></div>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(null);
  return (
    <div className="auth-wrap"><div className="card">
      <h1>Create account</h1>
      {err && <ErrorBox error={err} />}
      <form onSubmit={async (e) => { e.preventDefault(); try { await register(form.name, form.email, form.password); navigate('/login', { replace: true, state: { registered: true } }); } catch (x) { setErr(x); } }}>
        <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password (min 8)<input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button type="submit">Create account</button>
      </form>
      <p className="muted">Have an account? <Link to="/login">Log in</Link></p>
    </div></div>
  );
}