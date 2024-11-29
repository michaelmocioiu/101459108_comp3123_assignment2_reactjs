import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api'; // Import the Axios instance

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // This will give access to the current location object

  // Function to get query parameter from the URL
  const getQueryParam = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('query');
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        let url = '/employees';  // Default to fetching all employees

        // If there's a query parameter, fetch the filtered employees
        const query = getQueryParam();
        if (query) {
          url = `/employees/search?query=${query}`;
        }

        const response = await api.get(url);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [location.search]);  // Re-run this effect whenever the query parameter changes

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <li key={employee._id}>
              <Link to={`/employees/${employee._id}`}>
                {`${employee.first_name} ${employee.last_name}`}
              </Link>
            </li>
          ))
        ) : (
          <li>No employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;