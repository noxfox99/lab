import React, { useState, useEffect } from 'react';

const Settings = ({ onSave, initialValues }) => {
  const [settings, setSettings] = useState({
    feePercent: 1,
    receiveAddress: '',
    exchangeTime: 30,
    refreshInterval: 30
  });

  useEffect(() => {
    if (initialValues) {
      setSettings(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name.endsWith('Percent') || name.endsWith('Time') || name.endsWith('Interval') 
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="bg-gray-900 bg-opacity-90 p-6 rounded-xl shadow-xl max-w-md mx-auto border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Настройки обменника</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Комиссия от курса (%)</label>
          <input
            type="number"
            name="feePercent"
            min="0"
            max="20"
            step="0.1"
            value={settings.feePercent}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Адрес получения (по умолчанию)</label>
          <input
            type="text"
            name="receiveAddress"
            value={settings.receiveAddress}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
            placeholder="Введите ваш криптоадрес"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Время на обмен заявки (мин)</label>
          <input
            type="number"
            name="exchangeTime"
            min="1"
            max="120"
            value={settings.exchangeTime}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Период обновления курса (сек)</label>
          <input
            type="number"
            name="refreshInterval"
            min="5"
            max="300"
            value={settings.refreshInterval}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          >
            Сохранить настройки
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
