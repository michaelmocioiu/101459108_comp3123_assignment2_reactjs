import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';

const FormPage = () => {
  const { eid } = useParams(); // Fetch `eid` from the URL
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/employees');
  };

  return (
    <div>
      <h1>{eid ? 'Edit' : 'Add'} Employee</h1>
      <EmployeeForm employeeId={eid} onSave={handleSave} />
    </div>
  );
};

export default FormPage;