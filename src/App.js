import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether, SiMonero } from "react-icons/si";

// Список поддерживаемых монет с их иконками и API-идентификаторами
const coins = [
  { symbol: "BTC", icon: <FaBitcoin />, id: "bitcoin" },
  { symbol: "XMR", icon: <SiMonero />, id: "monero" },
  { symbol: "USDT", icon: <SiTether />, id: "tether" },
  { symbol: "ETH", icon: <FaEthereum />, id: "ethereum" },
  { symbol: "BNB", id: "binancecoin" },
  { symbol: "ADA", id: "cardano" },
  { symbol: "XRP", id: "ripple" }
];

function App() {
  const [fromCoin, setFromCoin] = useState(coins[0]); // BTC по умолчанию
  const [toCoin, setToCoin] = useState(coins[2]); // USDT по умолчанию
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState(null);
  const [received, setReceived] = useState("0");
  const [wallet, setWallet] = useState("");
  const [animateCoins, setAnimateCoins] = useState(false);
  const [showUSDT, setShowUSDT] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка реальных курсов
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin.id},${toCoin.id}&vs_currencies=usd`
        );
        const data = await response.json();
        
        const fromRate = data[fromCoin.id]?.usd;
        const toRate = data[toCoin.id]?.usd;
        
        if (fromRate && toRate) {
          const calculatedRate = fromRate / toRate;
          setRate(calculatedRate.toFixed(6));
          setReceived((amount * calculatedRate).toFixed(6));
        }
      } catch (err) {
        setError("Failed to fetch rates. Using default values.");
        // Запасные значения
        setRate("105000");
        setReceived((amount * 105000).toFixed(2));
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Обновление каждую минуту

    return () => clearInterval(interval);
  }, [fromCoin, toCoin, amount]);

  const handleSwap = () => {
    // Анимация
    setAnimateCoins(false);
    setTimeout(() => setAnimateCoins(true), 50);
    
    // Обновление курса (в реальном приложении здесь будет API-запрос)
    if (rate) {
      setReceived((amount * rate).toFixed(6));
    }
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
              <div className="bg-red-900 text-red-200 p-2 rounded text-sm">
                {error}
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

            <div className="text-xs text-gray-400">
              {loading ? (
                "Loading rate..."
              ) : (
                <>
                  Current rate: 1 {fromCoin.symbol} ≈ {rate} {toCoin.symbol}
                  <button 
                    onClick={handleSwap}
                    className="ml-2 text-blue-400 hover:text-blue-300"
                  >
                    Refresh
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-between items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">You Get</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={loading ? "Calculating..." : received}
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
                placeholder={`Enter the ${toCoin.symbol} payout address`}
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                {toCoin.symbol === "ETH" ? "ENS names supported" : ""}
              </p>
            </div>

            <button
              onClick={handleSwap}
              disabled={loading || !wallet}
              className={`w-full py-2 rounded font-semibold transition ${
                loading || !wallet
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : "Обменять"}
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
