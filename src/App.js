import React, { useState } from "react";

const coins = ["BTC", "ETH", "USDT", "BNB", "ADA", "XRP"];

function App() {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("0.0");
  const [received, setReceived] = useState("0.0");
  const [wallet, setWallet] = useState("");

  const handleSwap = () => {
    const mockRate = 39.41; // From the screenshot
    setRate(mockRate);
    setReceived((amount * mockRate).toFixed(8));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Please fill in transaction details
        </h2>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">You Send</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
            <select
              className="border rounded px-3 py-2"
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

        <div className="text-xs text-gray-500">
          Estimated rate: 1 {fromCoin} ≈ {rate} {toCoin}
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">You Get</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={received}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
            <select
              className="border rounded px-3 py-2"
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
          <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Wallet</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter the ETH payout address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">FIO protocol names are supported</p>
        </div>

        <button
          onClick={handleSwap}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Exchange Now
        </button>
      </div>
    </div>
  );
}

export default App;
