import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка учетных данных (в реальном приложении это будет запрос к API)
    if (username === 'admin' && password === 'admin123') {
      onLogin(true);
      navigate('/orders');
    } else {
      setError('Неверные учетные данные');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход в систему</h2>
        
        {error && (
          <div className="bg-red-900 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
