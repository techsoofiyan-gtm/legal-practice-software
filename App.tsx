import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Cases from './components/Cases';
import Tasks from './components/Tasks';
import Documents from './components/Documents';
import Workplace from './components/Workplace';
import Settings from './components/Settings';
import Login from './components/Login';
import { DataProvider } from './context/DataContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session simulation
    const session = localStorage.getItem('lexflow_session');
    if (session) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('lexflow_session', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lexflow_session');
    setIsAuthenticated(false);
  };

  if (loading) return null;

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          
          {/* Protected Routes */}
          <Route path="/" element={isAuthenticated ? <Layout onLogout={handleLogout}><Dashboard /></Layout> : <Navigate to="/login" />} />
          <Route path="/workplace" element={isAuthenticated ? <Layout onLogout={handleLogout}><Workplace /></Layout> : <Navigate to="/login" />} />
          <Route path="/clients" element={isAuthenticated ? <Layout onLogout={handleLogout}><Clients /></Layout> : <Navigate to="/login" />} />
          <Route path="/cases" element={isAuthenticated ? <Layout onLogout={handleLogout}><Cases /></Layout> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <Layout onLogout={handleLogout}><Tasks /></Layout> : <Navigate to="/login" />} />
          <Route path="/documents" element={isAuthenticated ? <Layout onLogout={handleLogout}><Documents /></Layout> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Layout onLogout={handleLogout}><Settings /></Layout> : <Navigate to="/login" />} />
          
          {/* Fallback for generic routes not implemented yet */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;