import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';  // Assuming you are using your axios instance

const EmployeeDetail = () => {
    const { eid } = useParams();  // Get the employee id from the URL
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/employees/${eid}`);  // Assuming you have this API route
                setEmployee(response.data);
                console.log(response.data)
            } catch (err) {
                setError('Error fetching employee details: ' + err.message);
                console.error('Error:', err);
            }
        };

        fetchEmployee();
    }, [eid]);  // Re-run the effect when eid changes

    const handleDelete = async () => {
        try {
          await api.delete('/employees', { params: { eid } });  // Send DELETE request
          window.location.href = '/employees';
        } catch (err) {
          setError('Error deleting employee: ' + err.message);
        }
      };

    if (error) {
        return <div>{error}</div>;
    }

    if (!employee) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h2>{employee.first_name} {employee.last_name}</h2>
            <h3><Link to={`/employees/edit/${employee._id}`}>Edit</Link></h3>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Salary:</strong> ${employee.salary}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            <p><strong>Created At:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
            <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete Employee
            </button>
        </div>
    );
};

export default EmployeeDetail;