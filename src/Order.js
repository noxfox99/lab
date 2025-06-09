import React, { useState } from "react";
import { FaBitcoin, FaEthereum, FaRegEdit, FaCog, FaHistory } from "react-icons/fa";
import { SiTether, SiBinance, SiMonero, SiCardano, SiRipple } from "react-icons/si";

const coinIcons = {
  BTC: <FaBitcoin className="text-yellow-400" />,
  ETH: <FaEthereum className="text-purple-400" />,
  USDT: <SiTether className="text-green-400" />,
  BNB: <SiBinance className="text-yellow-300" />,
  XMR: <SiMonero className="text-orange-500" />,
  ADA: <SiCardano className="text-blue-400" />,
  XRP: <SiRipple className="text-indigo-400" />,
};

const orders = [
  {
    id: "ORD12345",
    time: "04.06.2025, 13:45",
    from: "BTC",
    to: "XMR",
    amount: "0.5",
    rate: "105000",
    originWallet: "bc1qexampleorigin",
    destinationWallet: "44Affq5kexampledest",
    status: "Paid",
  },
  {
    id: "ORD12346",
    time: "04.06.2025, 14:12",
    from: "ETH",
    to: "USDT",
    amount: "1.2",
    rate: "3200",
    originWallet: "0xoriginwallet",
    destinationWallet: "TDESTwallet123",
    status: "Pending",
  },
];

const SettingsPanel = ({ settings, setSettings, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name.endsWith('Percent') || name.endsWith('Time') || name.endsWith('Interval') 
        ? parseFloat(value) || 0
        : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
          <span>Настройки обменника</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </h2>
        
        <div className="space-y-4">
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
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
            >
              Сохранить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Orders() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [settings, setSettings] = useState({
    feePercent: 1.5,
    receiveAddress: '',
    exchangeTime: 30,
    refreshInterval: 30
  });

  const toggleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Меню</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 w-full text-left ${activeTab === 'orders' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            <FaHistory />
            <span>История заказов</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 w-full text-left ${activeTab === 'settings' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            <FaCog />
            <span>Настройки</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        {activeTab === 'orders' ? (
          <>
            <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">История заказов</h1>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse shadow-xl rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-800 text-left text-gray-300 text-sm">
                    <th className="px-4 py-3 whitespace-nowrap">ID заказа</th>
                    <th className="px-4 py-3 whitespace-nowrap">Время</th>
                    <th className="px-4 py-3 whitespace-nowrap">Отправлено</th>
                    <th className="px-4 py-3 whitespace-nowrap">Получено</th>
                    <th className="px-4 py-3 whitespace-nowrap">Сумма</th>
                    <th className="px-4 py-3 whitespace-nowrap">Курс</th>
                    <th className="px-4 py-3 whitespace-nowrap">Статус</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <tr
                        className={`transition-colors ${
                          order.status === "Paid"
                            ? "bg-green-900/30 hover:bg-green-900/40"
                            : "bg-orange-900/30 hover:bg-orange-900/40"
                        } text-sm text-white shadow-inner`}
                      >
                        <td className="px-4 py-3 font-mono text-sm whitespace-nowrap">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{order.time}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {coinIcons[order.from]}
                            <span>{order.from}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {coinIcons[order.to]}
                            <span>{order.to}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{order.amount}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{order.rate}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Paid"
                                ? "bg-green-700 text-white shadow-green-500/50 shadow-sm"
                                : "bg-orange-600 text-white shadow-orange-400/50 shadow-sm"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            className="text-gray-300 hover:text-white transition"
                            onClick={() => toggleExpand(index)}
                          >
                            <FaRegEdit />
                          </button>
                        </td>
                      </tr>

                      {expandedRow === index && (
                        <tr className="bg-gray-800/40 text-sm text-gray-200 shadow-inner">
                          <td colSpan="8" className="px-6 py-4">
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
                              <div>
                                <span className="text-gray-400 text-xs">Origin Wallet:</span>
                                <div className="font-mono break-all">{order.originWallet}</div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs">Destination Wallet:</span>
                                <div className="font-mono break-all">{order.destinationWallet}</div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow shadow-red-500/30 transition">
                                Отменить
                              </button>
                              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow shadow-green-500/30 transition">
                                Оплачено
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">Настройки обменника</h1>
            
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-xl border border-gray-700 space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Комиссия от курса (%)</label>
                <input
                  type="number"
                  name="feePercent"
                  min="0"
                  max="20"
                  step="0.1"
                  value={settings.feePercent}
                  onChange={(e) => setSettings({...settings, feePercent: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Адрес получения (по умолчанию)</label>
                <input
                  type="text"
                  name="receiveAddress"
                  value={settings.receiveAddress}
                  onChange={(e) => setSettings({...settings, receiveAddress: e.target.value})}
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
                  onChange={(e) => setSettings({...settings, exchangeTime: parseFloat(e.target.value) || 0})}
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
                  onChange={(e) => setSettings({...settings, refreshInterval: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    // Здесь можно добавить сохранение в localStorage или API
                    setActiveTab('orders');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
                >
                  Сохранить настройки
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
