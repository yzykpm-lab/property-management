import React from 'react';
import Sidebar from '../components/Sidebar';

export default function CertificatesPage() {
  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">📄 אישורים וזכויות</h1>
        <p className="text-gray-500 mt-4">עמוד ניהול אישורים - בפיתוח</p>
      </div>
    </div>
  );
}
