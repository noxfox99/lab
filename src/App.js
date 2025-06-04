import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SiTether } from "react-icons/si";

const coins = ["BTC", "ETH", "USDT", "BNB", "ADA", "XRP"];

function App() {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("0.0");
  const [received, setReceived] = useState("0.0");
  const [wallet, setWallet] = useState("");

  const handleSwap = () => {
    const mockRate = 39.41; // Simulated rate
    setRate(mockRate);
    setReceived((amount * mockRate).toFixed(8));
  };

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
{/* Animation */}
        <div className="flex items-center justify-center mt-6 space-x-10">
          <motion.div
            initial={{ x: -100, opacity: 1 }}
            animate={{ x: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <FaBitcoin className="text-yellow-400 text-4xl" />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 1 }}
            animate={{ x: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <FaEthereum className="text-blue-400 text-4xl" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <SiTether className="text-green-400 text-4xl" />
          </motion.div>
        
      </div>
            <p className="text-gray-400 text-lg">
              Покупайте, продавайте и обменивайте криптовалюту: быстро, aнонимно и безопасно
            </p>
          </div>
          {/* Exchange Form */}
          <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700 space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide text-center shadow-md">
  Пожалуйста, укажите детали транзакции
</h2>

            <div className="flex justify-between items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">You Send</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Currency</label>
                <select
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={fromCoin}
                  onChange={(e) => setFromCoin(e.target.value)}
                >
                  {coins.map((coin) => (
                    <option key={coin} value={coin}>
                      {coin}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              Estimated rate: 1 {fromCoin} ≈ {rate} {toCoin}
            </div>

            <div className="flex justify-between items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">You Get</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={received}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Currency</label>
                <select
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                  value={toCoin}
                  onChange={(e) => setToCoin(e.target.value)}
                >
                  {coins.map((coin) => (
                    <option key={coin} value={coin}>
                      {coin}
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
                placeholder="Enter the ETH payout address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                ENS protocol names are supported
              </p>
            </div>

            <button
              onClick={handleSwap}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
            >
            Обменять
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-transparent text-center text-gray-500 text-xs">
        © LABIRINT 2025 - Anonumys SWAP
      </footer>
    </div>
  );
}

export default App;
