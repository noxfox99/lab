import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBitcoin, FaEthereum, FaSignOutAlt } from "react-icons/fa";
import { SiTether, SiMonero } from "react-icons/si";
import Auth from "./Auth";

// Компонент обменника (перенесен из вашего кода)
const Exchange = () => {
  const [fromCoin, setFromCoin] = useState(coins[0]);
  const [toCoin, setToCoin] = useState(coins[2]);
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState(null);
  const [received, setReceived] = useState("0");
  const [wallet, setWallet] = useState("");
  const [animateCoins, setAnimateCoins] = useState(false);
  const [showUSDT, setShowUSDT] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ... (все функции и useEffect из вашего кода остаются без изменений)

  const handleLogout = () => {
    localStorage.removeItem('cryptoAuth');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Header с кнопкой выхода */}
      <header className="w-full px-6 py-3 bg-black border-b border-gray-800 shadow-sm flex justify-between items-center">
        <img src="/logo.png" alt="Labirint Logo" className="h-10 object-contain" />
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-300 hover:text-white"
        >
          <FaSignOutAlt />
          <span>Выйти</span>
        </button>
      </header>

      {/* ... остальной код обменника без изменений ... */}
    </div>
  );
};

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('cryptoAuth') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cryptoAuth') === 'true';
  });

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Auth 
                onLogin={(success) => {
                  if (success) {
                    localStorage.setItem('cryptoAuth', 'true');
                    setIsAuthenticated(true);
                  }
                }} 
              />
            )
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} 
        />
      </Routes>
    </Router>
  );
}

// Остальные функции и константы переносим без изменений
const fetchBinanceRate = async (fromSymbol, toSymbol) => {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${fromSymbol}${toSymbol}`);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${toSymbol}${fromSymbol}`);
      const data = await response.json();
      return 1 / parseFloat(data.price);
    } catch (e) {
      throw new Error(`Курс для пары ${fromSymbol}/${toSymbol} не найден`);
    }
  }
};

const coins = [
  { symbol: "BTC", icon: <FaBitcoin />, binanceSymbol: "BTC" },
  { symbol: "ETH", icon: <FaEthereum />, binanceSymbol: "ETH" },
  { symbol: "USDT", icon: <SiTether />, binanceSymbol: "USDT" },
  { symbol: "XMR", icon: <SiMonero />, binanceSymbol: "XMR" },
  { symbol: "BNB", binanceSymbol: "BNB" },
  { symbol: "ADA", binanceSymbol: "ADA" },
  { symbol: "XRP", binanceSymbol: "XRP" }
];

export default App;
