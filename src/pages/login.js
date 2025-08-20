'use client';
import React, { useState } from 'react';
import Layout from '../layout/Layout';
import Breadcrumb from '../components/common/Breadcrumb';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful!');
      // Optionally redirect
      navigate.push("/")
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      toast.success('Registration successful!');
      setIsRegistering(false); // switch back to login
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Layout isCustomHeader={true} customHeaderClass='customHeaderStyle'>
      {/* <Breadcrumb pageName={isRegistering ? 'Register' : 'Login'} pageTitle={isRegistering ? 'Register' : 'Login'} /> */}
      <div className="login-bg">
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">{isRegistering ? 'Register' : 'Sign in'}</h1>
            <form className="login-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
              {isRegistering && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className='input-wrapper'>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {!isRegistering && (
                <div className="form-footer">
                  <label className="remember-me">
                    <input type="checkbox" name="remember" />
                    Remember me
                  </label>
                </div>
              )}

              <button type="submit" className="login-btn">
                {isRegistering ? 'Register' : 'Sign in'}
              </button>

              <p className="register-text">
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                <a
                  href="#"
                  className="register-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistering(!isRegistering);
                  }}
                >
                  {isRegistering ? 'Login here' : 'Register here'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
