import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PropertiesPage from './pages/PropertiesPage';
import TenantsPage from './pages/TenantsPage';
import CertificatesPage from './pages/CertificatesPage';
import InspectionsPage from './pages/InspectionsPage';
import CRMPage from './pages/CRMPage';
import FinancesPage from './pages/FinancesPage';
import UsersPage from './pages/UsersPage';

function App() {
  const { user, isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">טוען...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/" />} 
        />
        
        {user ? (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/inspections" element={<InspectionsPage />} />
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/finances" element={<FinancesPage />} />
            {user.role === 'admin' && (
              <Route path="/users" element={<UsersPage />} />
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
