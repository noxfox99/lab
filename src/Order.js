import React, { useState, useEffect } from "react";
import { FaBitcoin, FaEthereum, FaRegEdit, FaCog, FaHistory, FaLock, FaUser, FaSignOutAlt } from "react-icons/fa";
import { SiTether, SiBinance, SiMonero, SiCardano, SiRipple } from "react-icons/si";

// Иконки для криптовалют
const coinIcons = {
  BTC: <FaBitcoin className="text-yellow-400" />,
  ETH: <FaEthereum className="text-purple-400" />,
  USDT: <SiTether className="text-green-400" />,
  BNB: <SiBinance className="text-yellow-300" />,
  XMR: <SiMonero className="text-orange-500" />,
  ADA: <SiCardano className="text-blue-400" />,
  XRP: <SiRipple className="text-indigo-400" />,
};

// Тестовые данные заказов
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

// Компонент формы авторизации
const AuthForm = ({ onLogin, authError, loading }) => {
  const [credentials, setCredentials] = useState({
    login: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <FaLock className="text-4xl text-yellow-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold">Доступ к настройкам</h2>
        <p className="text-gray-400 mt-1">Требуется авторизация администратора</p>
      </div>
      
      {authError && (
        <div className="bg-red-900/80 text-red-200 p-3 rounded text-sm mb-4">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Логин администратора</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="login"
              value={credentials.login}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg pl-10 pr-3 py-2"
              placeholder="Введите логин"
              required
              autoFocus
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Пароль</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg pl-10 pr-3 py-2"
              placeholder="Введите пароль"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Проверка...
              </>
            ) : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Компонент настроек
const SettingsPanel = ({ settings, setSettings, onSave, onLogout }) => {
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
    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-xl border border-gray-700 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Настройки обменника</h2>
        <button 
          onClick={onLogout}
          className="flex items-center text-sm text-red-400 hover:text-red-300"
        >
          <FaSignOutAlt className="mr-1" /> Выйти
        </button>
      </div>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
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
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>
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
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Адрес получения по умолчанию</label>
          <input
            type="text"
            name="receiveAddress"
            value={settings.receiveAddress}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
            placeholder="Введите ваш криптоадрес"
          />
        </div>

        <div className="pt-3">
          <button
            onClick={onSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
function Orders() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [settings, setSettings] = useState({
    feePercent: 1.5,
    receiveAddress: '',
    exchangeTime: 30,
    refreshInterval: 30
  });

  // Проверка аутентификации при загрузке (например, из localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('cryptoAuth');
    if (savedAuth) {
      // В реальном приложении нужно проверять токен с сервером
      setIsAuthenticated(true);
    }
  }, []);

  // Загрузка сохраненных настроек
  useEffect(() => {
    const savedSettings = localStorage.getItem('exchangeSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const toggleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  const handleLogin = async ({ login, password }) => {
    setAuthLoading(true);
    setAuthError("");
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // В реальном приложении нужно делать запрос к API
      if (login === "admin" && password === "admin123") {
        setIsAuthenticated(true);
        localStorage.setItem('cryptoAuth', 'true');
      } else {
        throw new Error("Неверный логин или пароль");
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cryptoAuth');
    setActiveTab('orders');
  };

  const handleSaveSettings = () => {
    localStorage.setItem('exchangeSettings', JSON.stringify(settings));
    // Можно добавить уведомление об успешном сохранении
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Боковое меню */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-6">Меню</h2>
          <nav className="space-y-3">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg ${
                activeTab === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <FaHistory className="text-lg" />
              <span>История заказов</span>
            </button>
            <button 
              onClick={() => {
                if (isAuthenticated) {
                  setActiveTab('settings');
                } else {
                  setActiveTab('auth');
                }
              }}
              className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg ${
                activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <FaCog className="text-lg" />
              <span>Настройки</span>
              {isAuthenticated && (
                <span className="ml-auto text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">admin</span>
              )}
            </button>
          </nav>
        </div>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm text-red-400 hover:text-red-300 mt-auto pt-4"
          >
            <FaSignOutAlt />
            <span>Выйти из системы</span>
          </button>
        )}
      </aside>

      {/* Основное содержимое */}
      <main className="flex-grow p-6 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-auto">
        {activeTab === 'auth' ? (
          <div className="flex items-center justify-center h-full">
            <AuthForm 
              onLogin={handleLogin} 
              authError={authError} 
              loading={authLoading} 
            />
          </div>
        ) : activeTab === 'orders' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">История заказов</h1>
              <div className="text-sm text-gray-400">
                Всего заказов: <span className="text-white">{orders.length}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-xl">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-left text-gray-300 text-sm">
                    <th className="px-4 py-3 whitespace-nowrap">ID заказа</th>
                    <th className="px-4 py-3 whitespace-nowrap">Время</th>
                    <th className="px-4 py-3 whitespace-nowrap">Отправлено</th>
                    <th className="px-4 py-3 whitespace-nowrap">Получено</th>
                    <th className="px-4 py-3 whitespace-nowrap">Сумма</th>
                    <th className="px-4 py-3 whitespace-nowrap">Статус</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <tr
                        className={`transition-colors ${
                          order.status === "Paid"
                            ? "bg-green-900/20 hover:bg-green-900/30"
                            : "bg-orange-900/20 hover:bg-orange-900/30"
                        } text-sm text-white border-b border-gray-800`}
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
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Paid"
                                ? "bg-green-700 text-white"
                                : "bg-orange-600 text-white"
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
                        <tr className="bg-gray-800/40 text-sm text-gray-200">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <p className="text-gray-400 text-xs mb-1">Курс обмена:</p>
                                <p className="font-medium">
                                  1 {order.from} = {order.rate} {order.to}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs mb-1">Исходный кошелек:</p>
                                <p className="font-mono break-all text-sm">{order.originWallet}</p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs mb-1">Кошелек получателя:</p>
                                <p className="font-mono break-all text-sm">{order.destinationWallet}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm shadow transition">
                                Отменить заявку
                              </button>
                              {order.status !== "Paid" && (
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm shadow transition">
                                  Подтвердить оплату
                                </button>
                              )}
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
          <div className="max-w-4xl mx-auto">
            {isAuthenticated ? (
              <SettingsPanel 
                settings={settings} 
                setSettings={setSettings} 
                onSave={handleSaveSettings}
                onLogout={handleLogout}
              />
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-8 inline-block">
                  <FaLock className="text-5xl text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Доступ запрещен</h3>
                  <p className="text-gray-400 mb-6">Для доступа к настройкам требуется авторизация администратора</p>
                  <button
                    onClick={() => setActiveTab('auth')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
                  >
                    Перейти к авторизации
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
