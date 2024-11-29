import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import FormPage from './components/FormPage';

const Protected = () => {
  return (
    <div>
      <h2>Protected Page</h2>
      <p>This page is only accessible after logging in.</p>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {token ? (
            <>
              <li><Link to="/employees">Employee List</Link></li>
              <li><Link to="/employees/add">Add Employee</Link></li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/protected" element={token ? <Protected /> : <h2>Please log in first.</h2>} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/search" element={<EmployeeList />} />
        <Route path="/employees/add" element={<FormPage />} />
        <Route path="/employees/edit/:eid" element={<FormPage />} />
        <Route path="/employees/:eid" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;