import React, { useState } from 'react';
import { Sweet } from '../../types';
import { sweetService } from '../../services/sweetService';

interface SweetFormProps {
  sweet?: Sweet;
  onSave: () => void;
  onCancel: () => void;
}

const SweetForm: React.FC<SweetFormProps> = ({ sweet, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: sweet?.name || '',
    description: sweet?.description || '',
    category: sweet?.category || '',
    price: sweet?.price || 0,
    quantity: sweet?.quantity || 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (sweet) {
        await sweetService.update(sweet.id, formData);
      } else {
        await sweetService.create(formData);
      }
      onSave();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : 
              name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          min="0"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
        Cancel
      </button>
    </form>
  );
};

export default SweetForm;