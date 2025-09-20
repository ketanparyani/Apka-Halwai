import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button 
        onClick={() => setIsLogin(!isLogin)}
        style={{ marginTop: '16px' }}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginPage;