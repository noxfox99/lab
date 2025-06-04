import React, { useState } from "react";

const coins = ["BTC", "ETH", "USDT", "BNB", "ADA", "XRP"];

function App() {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("0.0");
  const [received, setReceived] = useState("0.0");

  const handleSwap = () => {
    // Mock exchange rate logic
    const mockRate = 15.0; // Example: 1 BTC = 15 ETH
    setRate(mockRate);
    setReceived((amount * mockRate).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-700 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Crypto Swap</h1>

      <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-lg space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="font-medium">From</label>
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

          <div className="flex items-center space-x-2">
            <label className="font-medium">To</label>
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

        <div className="flex items-center space-x-2">
          <label className="font-medium">Amount</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Exchange Rate:</span>
          <span>{rate} {toCoin} per {fromCoin}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">You Receive:</span>
          <span>{received} {toCoin}</span>
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          onClick={handleSwap}
        >
          Swap Now
        </button>
      </div>
    </div>
  );
}

export default App;
