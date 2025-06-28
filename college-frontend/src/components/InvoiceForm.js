import React, { useState } from 'react';
import axios from '../api/axiosConfig.js';

function InvoiceForm({ onInvoiceCreated }) {
  const [studentRollNumber, setStudentRollNumber] = useState('');
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceData = {
      student: studentRollNumber,
      description: description,
      total_amount: totalAmount,
      due_date: dueDate
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/invoices/', invoiceData);
      onInvoiceCreated(response.data);
      setStudentRollNumber('');
      setDescription('');
      setTotalAmount('');
      setDueDate('');
    } catch (error) {
      console.error('There was an error issuing the invoice!', error.response ? error.response.data : error.message);
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Student Roll Number</label><br/>
        <input type="text" value={studentRollNumber} onChange={e => setStudentRollNumber(e.target.value)} required style={{width: '95%', padding: '8px'}} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Description (e.g., "Semester 3 Tuition Fee")</label><br/>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required style={{width: '95%', padding: '8px'}} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Total Amount</label><br/>
        <input type="number" step="0.01" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} required style={{width: '95%', padding: '8px'}} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Due Date</label><br/>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required style={{width: '95%', padding: '8px'}} />
      </div>
      <button type="submit">Issue Invoice</button>
    </form>
  );
}

export default InvoiceForm;