import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/authStore';
import { FiLogOut, FiHome, FiUser, FiDollarSign, FiAlertCircle, FiClipboard, FiPhone, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
  const { user, logout } = useStore();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'דשבורד', icon: FiHome },
    { path: '/properties', label: 'נכסים', icon: FiHome },
    { path: '/tenants', label: 'שוכרים', icon: FiUser },
    { path: '/certificates', label: 'אישורים', icon: FiAlertCircle },
    { path: '/inspections', label: 'ביקורים', icon: FiClipboard },
    { path: '/crm', label: 'CRM', icon: FiPhone },
    { path: '/finances', label: 'כלכלה', icon: FiDollarSign },
  ];

  // Add users menu for admin only
  if (user?.role === 'admin') {
    menuItems.push({ path: '/users', label: 'משתמשים', icon: FiSettings });
  }

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg h-screen flex flex-col" dir="rtl">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold">DOORLY</h1>
        <p className="text-sm text-blue-200">ניהול נדלן</p>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-blue-700">
        <p className="text-sm text-blue-200">ברוך הבא</p>
        <p className="font-semibold text-lg">{user?.fullName}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-600 rounded-full text-xs">
          {getRoleLabel(user?.role)}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <FiLogOut size={20} />
          <span>התחברות</span>
        </button>
      </div>
    </div>
  );
}

function getRoleLabel(role) {
  const labels = {
    'admin': 'מנהל',
    'inspector': 'מפקח',
    'secretary': 'מזכירות',
    'accountant': 'חשבונאי'
  };
  return labels[role] || role;
}
