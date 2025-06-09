import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether, SiMonero } from "react-icons/si";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Orders from './Orders';
import Auth from './Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/orders" /> : 
          <Auth onLogin={(status) => {
            localStorage.setItem('cryptoAuth', 'true');
            setIsAuthenticated(status);
          }} />
        } />
        <Route path="/orders" element={
          isAuthenticated ? <Orders /> : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// Функция для получения курса с Binance API
const fetchBinanceRate = async (fromSymbol, toSymbol) => {
  try {
    // Пробуем прямую пару (BTC/USDT)
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${fromSymbol}${toSymbol}`);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    // Если прямой пары нет, пробуем обратную (USDT/BTC)
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${toSymbol}${fromSymbol}`);
      const data = await response.json();
      return 1 / parseFloat(data.price);
    } catch (e) {
      throw new Error(`Курс для пары ${fromSymbol}/${toSymbol} не найден`);
    }
  }
};

// Список поддерживаемых монет с Binance символами
const coins = [
  { symbol: "BTC", icon: <FaBitcoin />, binanceSymbol: "BTC" },
  { symbol: "ETH", icon: <FaEthereum />, binanceSymbol: "ETH" },
  { symbol: "USDT", icon: <SiTether />, binanceSymbol: "USDT" },
  { symbol: "XMR", icon: <SiMonero />, binanceSymbol: "XMR" },
  { symbol: "BNB", binanceSymbol: "BNB" },
  { symbol: "ADA", binanceSymbol: "ADA" },
  { symbol: "XRP", binanceSymbol: "XRP" }
];

function App() {
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

  // Основная функция расчета
  const calculateExchange = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Получаем курс с Binance
      const currentRate = await fetchBinanceRate(
        fromCoin.binanceSymbol,
        toCoin.binanceSymbol
      );
      
      setRate(currentRate.toFixed(8));
      setReceived((parseFloat(amount) * currentRate).toFixed(8));
      
    } catch (error) {
      setError(error.message);
      // Fallback на CoinGecko если Binance не работает
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin.binanceSymbol.toLowerCase()}&vs_currencies=${toCoin.binanceSymbol.toLowerCase()}`
        );
        const data = await response.json();
        const fallbackRate = data[fromCoin.binanceSymbol.toLowerCase()]?.[toCoin.binanceSymbol.toLowerCase()];
        if (fallbackRate) {
          setRate(fallbackRate);
          setReceived((parseFloat(amount) * fallbackRate).toFixed(8));
        }
      } catch (geckoError) {
        console.error("CoinGecko fallback failed:", geckoError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Вызываем расчет при изменении параметров
  useEffect(() => {
    calculateExchange();
  }, [fromCoin, toCoin, amount]);

  // Автообновление курса каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      calculateExchange();
    }, 30000);
    return () => clearInterval(interval);
  }, [fromCoin, toCoin]);

  const handleSwap = () => {
    setAnimateCoins(false);
    setTimeout(() => setAnimateCoins(true), 50);
    calculateExchange();
  };

  // Автоматическая анимация иконок
  useEffect(() => {
    const interval = setInterval(() => {
      setShowUSDT(false);
      setTrigger((prev) => prev + 1);
      setTimeout(() => setShowUSDT(true), 1400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-3 bg-black border-b border-gray-800 shadow-sm flex items-center space-x-4">
        <img src="/logo.png" alt="Labirint Logo" className="h-10 object-contain" />
      </header>

      {/* Main content */}
      <main className="flex flex-grow items-center justify-center px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12 w-full max-w-6xl">
          {/* Left Side Message */}
          <div className="mb-10 lg:mb-0 text-center lg:text-left max-w-md">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              Anonymous Web3.0 Crypto Exchange
            </h1>
            
            {/* Coin Animation */}
            <div className="flex justify-center items-center z-1 pointer-events-none">
              <AnimatePresence initial={false}>
                {!showUSDT && (
                  <>
                    <motion.div
                      key={`btc-${trigger}`}
                      initial={{ x: -120 }}
                      animate={{ x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4 }}
                      className="mx-10"
                    >
                      <FaBitcoin className="text-yellow-400 text-6xl opacity-30" />
                    </motion.div>
                    <motion.div
                      key={`xmr-${trigger}`}
                      initial={{ x: 120 }}
                      animate={{ x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4 }}
                      className="mx-10"
                    >
                      <SiMonero className="text-orange-500 text-6xl opacity-30" />
                    </motion.div>
                  </>
                )}
                {showUSDT && (
                  <motion.div
                    key={`usdt-${trigger}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.3, 1.6, 1.0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <SiTether className="text-green-400 text-6xl opacity-30 drop-shadow-glow" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-gray-400 text-lg">
              Покупайте, продавайте и обменивайте криптовалюту: быстро, анонимно и безопасно
            </p>
          </div>

          {/* Exchange Form */}
          <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700 space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide text-center shadow-md">
              Пожалуйста, укажите детали транзакции
            </h2>

            {error && (
              <div className="bg-yellow-900 text-yellow-200 p-2 rounded text-sm">
                {error} (используются резервные данные)
              </div>
            )}

            <div className="flex justify-between items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">You Send</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.000001"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Currency</label>
                <select
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={fromCoin.symbol}
                  onChange={(e) => {
                    const selected = coins.find(c => c.symbol === e.target.value);
                    setFromCoin(selected);
                  }}
                >
                  {coins.map((coin) => (
                    <option key={coin.symbol} value={coin.symbol}>
                      {coin.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded border border-gray-700">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Получение актуального курса...</span>
                </div>
              ) : (
                <>
                  <div className="font-mono text-center">
                    1 {fromCoin.symbol} = {rate} {toCoin.symbol}
                  </div>
                  <div className="text-xs text-center text-green-400 mt-1">
                    {error ? "CoinGecko" : ""} • Обновляется каждые 30 сек
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">You Get</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={loading ? "..." : received}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Currency</label>
                <select
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={toCoin.symbol}
                  onChange={(e) => {
                    const selected = coins.find(c => c.symbol === e.target.value);
                    setToCoin(selected);
                  }}
                >
                  {coins.map((coin) => (
                    <option key={coin.symbol} value={coin.symbol}>
                      {coin.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Recipient Wallet</label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                placeholder={`Enter ${toCoin.symbol} address`}
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                {toCoin.symbol === "ETH" ? "ENS names supported" : ""}
              </p>
            </div>

            <button
              onClick={handleSwap}
              disabled={loading || !wallet || parseFloat(amount) <= 0}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                loading || !wallet || parseFloat(amount) <= 0
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "ОБМЕНЯТЬ СЕЙЧАС"
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-transparent text-center text-gray-500 text-xs">
        © LABIRINT 2025 - Anonymous SWAP
      </footer>
    </div>
  );
}

export default App;
