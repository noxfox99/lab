import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SiTether, SiMonero } from "react-icons/si";
import Confetti from "react-confetti";

const coins = ["BTC", "ETH", "USDT", "BNB", "ADA", "XRP"];

function App() {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("0.0");
  const [received, setReceived] = useState("0.0");
  const [wallet, setWallet] = useState("");
  const [animateCoins, setAnimateCoins] = useState(false);
  const [showUSDT, setShowUSDT] = useState(false);
  const [trigger, setTrigger] = useState(0);
  
const handleSwap = () => {
    const mockRate = 15.0;
    setRate(mockRate);
    setReceived((amount * mockRate).toFixed(2));
    setAnimateCoins(false); // Reset
    setTimeout(() => setAnimateCoins(true), 50); // Restart animation

    setShowUSDT(false);
    setTrigger((prev) => prev + 1);
    setTimeout(() => setShowUSDT(true), 1400);
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
{/* Coin Collision Animation */}
      <div className="relative w-full flex flex-col items-center my-6">
        <AnimatePresence initial={false}>
          {!showUSDT && (
            <>
              <motion.div
                key={`btc-${trigger}`}
                initial={{ x: -150 }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4 }}
                className="absolute left-1/3 top-0"
              >
                <FaBitcoin className="text-yellow-400 text-6xl" />
              </motion.div>
              <motion.div
                key={`xmr-${trigger}`}
                initial={{ x: 150 }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4 }}
                className="absolute right-1/3 top-0"
              >
                <SiMonero className="text-orange-500 text-6xl" />
              </motion.div>
            </>
          )}

          {showUSDT && (
            <>
              <motion.div
                key={`boom-${trigger}`}
                initial={{ scale: 0 }}
                animate={{ scale: [1.3, 1.6, 1.0] }}
                transition={{ duration: 0.6 }}
                className="text-green-400 text-6xl"
              >
                <SiTether className="drop-shadow-glow" />
              </motion.div>
              <Confetti numberOfPieces={60} recycle={false} />
            </>
          )}
        </AnimatePresence>
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
