import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useStore } from '../store/authStore';
import api from '../services/api';

export default function DashboardPage() {
  const { user } = useStore();
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [alertsRes, statsRes] = await Promise.all([
        api.get('/alerts'),
        api.get('/dashboard/stats')
      ]);
      setAlerts(alertsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">דשבורד</h1>
            <p className="text-gray-600">ברוך הבא, {user?.fullName}</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">טוען...</div>
          ) : (
            <>
              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    title="נכסים"
                    value={stats.totalProperties}
                    icon="🏢"
                  />
                  <StatCard 
                    title="שוכרים"
                    value={stats.totalTenants}
                    icon="👥"
                  />
                  <StatCard 
                    title="בעיות תשלום"
                    value={stats.tenantsWithIssues}
                    icon="⚠️"
                    color="red"
                  />
                  <StatCard 
                    title="אישורים שדלקו"
                    value={stats.expiredCertificates}
                    icon="📄"
                    color="red"
                  />
                </div>
              )}

              {/* Alerts Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ התראות חשובות</h2>
                
                {alerts.length === 0 ? (
                  <p className="text-gray-500">אין התראות</p>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <AlertItem key={index} alert={alert} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color = 'blue' }) {
  const bgColor = color === 'red' ? 'bg-red-50' : 'bg-blue-50';
  const textColor = color === 'red' ? 'text-red-600' : 'text-blue-600';

  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}

function AlertItem({ alert }) {
  const priorityColor = {
    'urgent': 'bg-red-100 border-red-300 text-red-800',
    'high': 'bg-orange-100 border-orange-300 text-orange-800',
    'medium': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'low': 'bg-blue-100 border-blue-300 text-blue-800'
  };

  return (
    <div className={`border-l-4 p-4 rounded ${priorityColor[alert.priority] || priorityColor.medium}`}>
      <p className="font-semibold">{alert.title}</p>
      <p className="text-sm mt-1">{alert.message}</p>
      <p className="text-xs mt-2 opacity-75">{new Date(alert.date).toLocaleDateString('he-IL')}</p>
    </div>
  );
}
