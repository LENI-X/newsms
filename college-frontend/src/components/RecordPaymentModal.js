// src/components/RecordPaymentModal.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig.js';

function RecordPaymentModal({ show, onClose, invoice, onPaymentRecorded }) {
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [mode, setMode] = useState('BANK');
  const [referenceNumber, setReferenceNumber] = useState('');

  // This effect pre-fills the form when the invoice prop changes
  useEffect(() => {
    if (invoice) {
      setAmountPaid(invoice.total_amount); // Default to the full amount
      setPaymentDate(new Date().toISOString().slice(0, 10)); // Default to today
    }
  }, [invoice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      invoice: invoice.id,
      amount_paid: amountPaid,
      payment_date: paymentDate,
      mode: mode,
      reference_number: referenceNumber
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/payments/', paymentData);
      onPaymentRecorded(response.data); // Notify the parent of the new payment
      onClose(); // Close the modal
      alert('Payment recorded successfully!');
    } catch (error) {
      console.error('Error recording payment:', error.response.data);
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  if (!show) {
    return null;
  }

  // Basic styling for the modal
  const modalStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  };
  const modalContentStyle = {
    backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <h2>Record Payment for Invoice #{invoice.id}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Amount Paid</label><br/>
            <input type="number" step="0.01" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} required style={{width: '95%'}} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Payment Date</label><br/>
            <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} required style={{width: '95%'}} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Payment Mode</label><br/>
            <select value={mode} onChange={e => setMode(e.target.value)} style={{width: '100%'}}>
              <option value="BANK">Bank Transfer</option>
              <option value="CASH">Cash</option>
              <option value="CHEQUE">Cheque</option>
              <option value="DD">Demand Draft</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Reference Number (Optional)</label><br/>
            <input type="text" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} style={{width: '95%'}} />
          </div>
          <button type="submit">Submit Payment</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default RecordPaymentModal;