import React, { useState } from "react";

const coins = ["BTC", "ETH", "USDT", "BNB", "ADA", "XRP"];

function App() {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-700 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Crypto Swap</h1>

      <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">From</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={fromCoin}
            onChange={(e) => setFromCoin(e.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin}>{coin}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">To</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={toCoin}
            onChange={(e) => setToCoin(e.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin}>{coin}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
          onClick={() => alert(`Swapping ${amount} ${fromCoin} to ${toCoin}`)}
        >
          Swap Now
        </button>
      </div>
    </div>
  );
}

export default App;
