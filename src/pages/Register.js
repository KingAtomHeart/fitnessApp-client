import React, { useState } from 'react';
import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';

const notyf = new Notyf();

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fitnessapp-api-ln8u.onrender.com/users/register', { email, password });
      notyf.success('Registered Successfully');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      notyf.error('Registration Failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;