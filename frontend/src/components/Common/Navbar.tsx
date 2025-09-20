import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '16px', 
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ccc'
    }}>
      <h2>APKA HALWAI</h2>
      
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Welcome, {user.username} {isAdmin && '(Admin)'}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <span>Please log in</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;