// src/components/StudentTable.js
import React from 'react';
import { Link } from 'react-router-dom';

// The component now accepts 'students' and a new 'onDelete' function as props
function StudentTable({ students, onDelete, onEdit }) {
  return (
    <div>
      <h2>Students List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Roll Number</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Full Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Course</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Semester</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th> {/* <-- Add new header */}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.roll_number} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}><Link to={`/students/${student.roll_number}/details`}>
                {student.roll_number}
              </Link></td>
              <td style={{ padding: '8px' }}>{student.full_name}</td>
              <td style={{ padding: '8px' }}>{student.course}</td>
              <td style={{ padding: '8px' }}>{student.semester}</td>
              <td style={{ padding: '8px' }}>
                
                {/* When clicked, this button calls the onDelete function passed via props,
                    sending the student's roll number as an argument. */}
                <button onClick={() => onEdit(student)} style={{marginRight: '5px'}}>
                Edit
                </button>
                <button onClick={() => onDelete(student.roll_number)} style={{color: 'red'}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;