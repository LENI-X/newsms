// src/pages/StudentDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import axios from '../api/axiosConfig.js';
import RecordPaymentModal from '../components/RecordPaymentModal';

function StudentDetailPage() {
  // 1. Get the 'roll_number' from the URL (e.g., /students/CSE2025-01/details)
  const { roll_number } = useParams();

  // 2. State for student details, invoices, and loading status
  const [student, setStudent] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // 3. useEffect to fetch all data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create both API requests
        const studentRequest = axios.get(`http://127.0.0.1:8000/api/students/${roll_number}/`);
        const invoicesRequest = axios.get(`http://127.0.0.1:8000/api/students/${roll_number}/invoices/`);

        // Run requests concurrently for better performance
        const [studentResponse, invoicesResponse] = await Promise.all([studentRequest, invoicesRequest]);

        // Set state with the responses
        setStudent(studentResponse.data);
        setInvoices(invoicesResponse.data);
      } catch (err) {
        setError('Failed to fetch student data. Please check the roll number.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    
  }, [roll_number]);

  const handleRecordPaymentClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedInvoice(null);
  };

  const handlePaymentRecorded = (newPayment) => {
    // Find the invoice that was paid and update its status in our local state
    const updatedInvoices = invoices.map(inv =>
      inv.id === newPayment.invoice ? { ...inv, status: 'PAID' } : inv
    );
    setInvoices(updatedInvoices);
  };
 // Re-run effect if the roll_number changes

  // 4. Conditional rendering for loading and error states
  if (loading) {
    return <p>Loading student details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {/* 5. Display student profile information */}
      <h1>Financials for {student.full_name}</h1>
      <div style={{ padding: '15px', background: '#f9f9f9', borderRadius: '5px', marginBottom: '20px' }}>
        <p><strong>Roll Number:</strong> {student.roll_number}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
      </div>

      {/* 6. Display the invoice table */}
      <h2>Invoice History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Invoice ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Due Date</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? invoices.map(invoice => (
            <tr key={invoice.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>#{invoice.id}</td>
              <td style={{ padding: '8px' }}>{invoice.description}</td>
              <td style={{ padding: '8px' }}>₹{invoice.total_amount}</td>
              <td style={{ padding: '8px' }}>{invoice.due_date}</td>
              <td style={{ padding: '8px' }}>
                <span style={{
                  color: 'white',
                  backgroundColor: invoice.status === 'PAID' ? 'green' : 'red',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {invoice.status}
                </span>
              </td>
              <td style={{ padding: '8px' }}>
                {invoice.status === 'PENDING' && (
                  <button onClick={() => handleRecordPaymentClick(invoice)}>
                    Record Payment
                  </button>
                )}
              </td>              
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ padding: '8px', textAlign: 'center' }}>No invoices found for this student.</td>
            </tr>
          )}
        </tbody>
        
      </table>
      <RecordPaymentModal
        show={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        invoice={selectedInvoice}
        onPaymentRecorded={handlePaymentRecorded}
      />
    </div>
  );
}

export default StudentDetailPage;