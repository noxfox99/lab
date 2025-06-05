// src/Orders.js
import React, { useState } from "react";

const dummyOrders = [
  {
    from: "BTC",
    to: "USDT",
    amount: "1.5",
    rate: "105000",
    destinationWallet: "usdt-wallet-123",
    originWallet: "btc-wallet-456",
  },
  {
    from: "XMR",
    to: "ETH",
    amount: "2.3",
    rate: "170",
    destinationWallet: "eth-wallet-789",
    originWallet: "xmr-wallet-321",
  },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-6">Orders</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("history")}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 ${
              activeTab === "history" ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 ${
              activeTab === "settings" ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {activeTab === "history" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-600 bg-gray-900 rounded">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left border-r border-gray-600">From</th>
                    <th className="px-4 py-2 text-left border-r border-gray-600">To</th>
                    <th className="px-4 py-2 text-left border-r border-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left border-r border-gray-600">Rate</th>
                    <th className="px-4 py-2 text-left border-r border-gray-600">Destination Wallet</th>
                    <th className="px-4 py-2 text-left">Origin Wallet</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyOrders.map((order, index) => (
                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-800">
                      <td className="px-4 py-2">{order.from}</td>
                      <td className="px-4 py-2">{order.to}</td>
                      <td className="px-4 py-2">{order.amount}</td>
                      <td className="px-4 py-2">{order.rate}</td>
                      <td className="px-4 py-2">{order.destinationWallet}</td>
                      <td className="px-4 py-2">{order.originWallet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-400">Settings content goes here...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
