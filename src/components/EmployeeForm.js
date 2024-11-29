import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming you have the Axios instance

const EmployeeForm = ({ employeeId, onSave }) => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });

  // Fetch existing employee data if editing
  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await api.get(`/employees/${employeeId}`);
          const emp_data = response.data;
          emp_data.date_of_joining = emp_data.date_of_joining.split('T')[0];
          setEmployee(emp_data);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeId) {
        await api.put(`/employees/${employeeId}`, employee);
      } else {
        await api.post('/employees', employee);
      }
      onSave(); // Callback to update the parent component after saving
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={employee.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={employee.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Joining:</label>
        <input
          type="date"
          name="date_of_joining"
          value={employee.date_of_joining}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{employeeId ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;