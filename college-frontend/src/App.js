// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import StudentDetailPage from './pages/StudentDetailPage';
import Header from './components/header.js';
import Sidebar from './components/Sidebar.js';
import DashboardPage from './pages/Dashboard';
import StudentsPage from './pages/Students';
import AddStudentPage from './pages/AddStudentPage';
import IssueInvoicePage from './pages/IssueInvoicePage';
import LoginPage from './pages/LoginPage';

function App() {
  const mainContentStyle = {
    marginLeft: '240px',
    padding: '20px'
  };

  return (
    <Router>
      <AuthProvider>
      <div className="App">
        
        <Header />
        <Sidebar />
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/new" element={<AddStudentPage />} />
            <Route path="/invoices/new" element={<IssueInvoicePage />} />
            <Route path="/students/:roll_number/details" element={<StudentDetailPage />} />
            <Route path="/*" element={<MainAppLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<ProtectedRoute> <MainAppLayout /> </ProtectedRoute>}/>
        </Routes>          
        </main>
      </div>
      </AuthProvider>
    </Router>
  );
}
function MainAppLayout() {
  const mainContentStyle = {
    marginLeft: '240px',
    padding: '20px'
  };

  return (
    <div className="App">
      <Header />
      <Sidebar />
      <main style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/new" element={<AddStudentPage />} />
          <Route path="/students/:roll_number/details" element={<StudentDetailPage />} />
          <Route path="/invoices/new" element={<IssueInvoicePage />} />
          

        </Routes>
      </main>
    </div>
  );
}

export default App;