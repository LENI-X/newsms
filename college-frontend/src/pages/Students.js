// src/pages/StudentsPage.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig.js';
import { Link } from 'react-router-dom'; // Import Link for the button
import StudentTable from '../components/StudentTable';
import EditStudentModal from '../components/EditStudentModal';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetching logic remains the same
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/students/');
        setStudents(response.data);
      } catch (error) {
        console.error("There was an error fetching the students!", error);
      }
    };
    fetchStudents();
  }, []);

  // Delete and Update logic remains the same
  const handleDeleteStudent = async (rollNumber) => { /* ... existing delete logic ... */ };
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleStudentUpdated = (updatedStudent) => { /* ... existing update logic ... */ };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Management</h1>
        {/* --- THIS IS THE NEW BUTTON --- */}
        <Link to="/students/new" style={{ textDecoration: 'none', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px' }}>
          + Add New Student
        </Link>
      </div>
      <p>Here you can view, edit, and delete student records.</p>
      <hr />
      <StudentTable
        students={students}
        onDelete={handleDeleteStudent}
        onEdit={handleEditClick}
      />
      <EditStudentModal
        show={isModalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
        onStudentUpdated={handleStudentUpdated}
      />
    </div>
  );
}

export default StudentsPage;