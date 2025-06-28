import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';

function IssueInvoicePage() {
  const navigate = useNavigate();

  const handleInvoiceCreated = (newInvoice) => {
    alert(`Invoice #${newInvoice.id} created successfully for student ${newInvoice.student}!`);
    navigate('/');
  };

  return (
    <div>
      <h1>Issue New Invoice</h1>
      <p>Fill out the form below to create a new fee invoice for a student.</p>
      <hr />
      <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
    </div>
  );
}

export default IssueInvoicePage;