// src/components/EditStudentModal.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig.js';

function EditStudentModal({ show, onClose, student, onStudentUpdated }) {
  // State to manage the form data
  const [formData, setFormData] = useState({ full_name: '', course: '', semester: '' });

  // This effect runs when the 'student' prop changes.
  // It populates the form with the data of the student being edited.
  useEffect(() => {
    if (student) {
      setFormData({
        full_name: student.full_name,
        course: student.course,
        semester: student.semester,
      });
    }
  }, [student]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student) return;

    try {
      // Send a PUT request to update the student data
      const response = await axios.put(`http://127.0.0.1:8000/api/students/${student.roll_number}/`, {
        ...formData, // Send the updated form data
        roll_number: student.roll_number // Roll number is not editable but must be sent
      });
      onStudentUpdated(response.data); // Notify the parent component of the update
      onClose(); // Close the modal
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student.');
    }
  };

  if (!show) {
    return null; // Don't render anything if the modal is not shown
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
        <h2>Edit Student: {student.roll_number}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Full Name</label><br/>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={{width: '95%'}} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Course</label><br/>
            <input type="text" name="course" value={formData.course} onChange={handleChange} required style={{width: '95%'}} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Semester</label><br/>
            <input type="number" name="semester" value={formData.semester} onChange={handleChange} required style={{width: '95%'}} />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditStudentModal;