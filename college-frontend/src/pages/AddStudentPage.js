// src/pages/AddStudentPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StudentForm from '../components/StudentForm';


function AddStudentPage() {
  const navigate = useNavigate(); // Initialize the navigate function

  // This function will be called by the form after a student is successfully created
  const handleStudentCreated = (newStudent) => {
    console.log('Student created:', newStudent);
    // Redirect the user back to the main students list page
    navigate('/students');
  };

  return (
    <div>
      <h1>Add a New Student</h1>
      <p>Fill out the form below to add a new student record.</p>
      <hr />
      <StudentForm onStudentCreated={handleStudentCreated} />
    </div>
  );
}

export default AddStudentPage;