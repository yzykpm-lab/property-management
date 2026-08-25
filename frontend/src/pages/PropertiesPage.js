import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: '',
    address: { street: '', city: '', postalCode: '' },
    propertyType: 'residential',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      await api.post('/properties', formData);
      fetchProperties();
      setShowForm(false);
      setFormData({
        propertyName: '',
        address: { street: '', city: '', postalCode: '' },
        propertyType: 'residential',
        ownerName: '',
        ownerPhone: '',
        ownerEmail: ''
      });
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">🏢 נכסים</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + הוסף נכס
            </button>
          </div>

          {/* Add Property Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">הוסף נכס חדש</h2>
              <form onSubmit={handleAddProperty} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="שם הנכס"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="residential">דיור</option>
                    <option value="commercial">מסחרי</option>
                    <option value="office">משרדים</option>
                    <option value="mixed">מעורב</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="רחוב"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, street: e.target.value}
                    })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="עיר"
                    value={formData.address.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, city: e.target.value}
                    })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="מיקוד"
                    value={formData.address.postalCode}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, postalCode: e.target.value}
                    })}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="שם בעלים"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="טלפון בעלים"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="מייל בעלים"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    שמור
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Properties List */}
          {loading ? (
            <div className="text-center text-gray-500">טוען...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property }) {
  const typeEmoji = {
    residential: '🏠',
    commercial: '🏪',
    office: '🏢',
    mixed: '🏗️'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{property.propertyName}</h3>
          <p className="text-sm text-gray-500">{typeEmoji[property.propertyType]} {property.propertyType}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p>📍 {property.address?.street}, {property.address?.city}</p>
        <p>👤 {property.ownerName}</p>
        <p>📞 {property.ownerPhone}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          צפה
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300">
          עריכה
        </button>
      </div>
    </div>
  );
}
