import React, { useState } from 'react';
import { Sweet } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { sweetService } from '../../services/sweetService';

interface SweetCardProps {
  sweet: Sweet;
  onUpdate: () => void;
  onEdit?: () => void; // Add this line
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onUpdate, onEdit }) => {
  const { isAdmin } = useAuth();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [restockQuantity, setRestockQuantity] = useState(10);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (purchaseQuantity <= 0) return;
    
    setLoading(true);
    try {
      await sweetService.purchase(sweet.id, purchaseQuantity);
      onUpdate();
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    if (restockQuantity <= 0) return;
    
    setLoading(true);
    try {
      await sweetService.restock(sweet.id, restockQuantity);
      onUpdate();
    } catch (error) {
      console.error('Restock failed:', error);
      alert('Restock failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: any): string => {
    if (typeof price === 'string') {
      return parseFloat(price).toFixed(2);
    } else if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return '0.00';
  };

  return (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '20px', 
      borderRadius: '12px', 
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>{sweet.name}</h3>
        {isAdmin && onEdit && (
          <button 
            onClick={onEdit}
            style={{
              backgroundColor: '#4ecdc4',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Edit
          </button>
        )}
      </div>
      
      <p style={{ color: '#666', margin: '0 0 15px 0' }}>{sweet.description}</p>
      
      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: '#333' }}>Category:</span>
        <span style={{ color: '#666', marginLeft: '5px' }}>{sweet.category}</span>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: '#333' }}>Price:</span>
        <span style={{ color: '#2ecc71', marginLeft: '5px' }}> ₹{formatPrice(sweet.price)}</span>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontWeight: 'bold', color: '#333' }}>In Stock:</span>
        <span style={{ 
          color: sweet.quantity > 10 ? '#2ecc71' : sweet.quantity > 0 ? '#f39c12' : '#e74c3c',
          marginLeft: '5px',
          fontWeight: 'bold'
        }}>
          {sweet.quantity}
        </span>
      </div>
      
      {sweet.quantity > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={purchaseQuantity}
              onChange={(e) => setPurchaseQuantity(parseInt(e.target.value) || 1)}
              style={{ 
                width: '60px', 
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button 
              onClick={handlePurchase} 
              disabled={loading || purchaseQuantity > sweet.quantity}
              style={{
                backgroundColor: loading ? '#95a5a6' : '#3498db',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Purchase'}
            </button>
          </div>
        </div>
      )}
      
      {sweet.quantity === 0 && (
        <div style={{ 
          backgroundColor: '#ffeaa7', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <span style={{ color: '#d35400' }}>Out of Stock</span>
        </div>
      )}
      
      {isAdmin && (
        <div style={{ 
          borderTop: '1px solid #eee', 
          paddingTop: '15px',
          marginTop: '15px'
        }}>
          <h4 style={{ color: '#7f8c8d', margin: '0 0 10px 0', fontSize: '14px' }}>Admin Actions</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="number"
              min="1"
              value={restockQuantity}
              onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 10)}
              style={{ 
                width: '60px', 
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button 
              onClick={handleRestock} 
              disabled={loading}
              style={{
                backgroundColor: loading ? '#95a5a6' : '#9b59b6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Restock'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetCard;