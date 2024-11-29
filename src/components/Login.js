import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);  // Save the token in localStorage
      console.log(token)
      onLogin(token);  // Pass the token to the parent component
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;