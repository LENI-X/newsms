// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function StudentForm({ onStudentCreated }) {
  // State for each form field
  const [rollNumber, setRollNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission

    const newStudent = {
      roll_number: rollNumber,
      full_name: fullName,
      course: course,
      semester: parseInt(semester) // Ensure semester is an integer
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/students/', newStudent);
      // Call the function passed from the parent component
      onStudentCreated(response.data);
      // Clear form fields after successful submission
      setRollNumber('');
      setFullName('');
      setCourse('');
      setSemester('');
      alert('Student created successfully!');
    } catch (error) {
      console.error('There was an error creating the student!', error);
      alert('Error creating student. Check the console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Add New Student</h3>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="number" placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} required />
      </div>
      <button type="submit">Create Student</button>
    </form>
  );
}

export default StudentForm;