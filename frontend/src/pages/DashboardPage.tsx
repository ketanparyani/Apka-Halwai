import React, { useState, useEffect } from 'react';
import { Sweet } from '../types';
import { sweetService } from '../services/sweetService';
import { useAuth } from '../context/AuthContext';
import SweetCard from '../components/Sweet/SweetCard';
import SweetForm from '../components/Sweet/SweetForm';
import SearchBar from '../pages/SearchBar';

const DashboardPage: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | undefined>();
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      const data = await sweetService.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (error) {
      console.error('Failed to load sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (results: Sweet[]) => {
    setFilteredSweets(results);
  };

  const handleAddSweet = () => {
    setEditingSweet(undefined);
    setShowForm(true);
  };

  const handleEditSweet = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSweet(undefined);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingSweet(undefined);
    loadSweets();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#ff6b6b', margin: 0 }}>APKA HALWAI STORE</h1>
        {isAdmin && (
          <button 
            onClick={handleAddSweet}
            style={{
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            + Add New Sweet
          </button>
        )}
      </div>

      <SearchBar onSearch={handleSearch} />

      {showForm && (
        <div style={{ 
          marginBottom: '30px', 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <SweetForm 
            sweet={editingSweet} 
            onSave={handleFormSave} 
            onCancel={handleFormClose} 
          />
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredSweets.map(sweet => (
          <SweetCard 
            key={sweet.id} 
            sweet={sweet} 
            onUpdate={loadSweets}
            onEdit={isAdmin ? () => handleEditSweet(sweet) : undefined}
          />
        ))}
      </div>

      {filteredSweets.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666',
          fontSize: '18px'
        }}>
          No sweets found. {isAdmin && 'Try adding some sweets!'}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;