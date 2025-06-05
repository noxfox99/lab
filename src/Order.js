import React, { useState } from "react";
import {
  FaBitcoin,
  FaEthereum,
  FaRegEdit,
} from "react-icons/fa";
import {
  SiTether,
  SiMonero,
  SiBinance,
  SiCardano,
  SiRipple,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const orders = [
  {
    id: "ORD-001",
    time: "2025-06-03 14:21",
    from: "BTC",
    to: "XMR",
    amount: "1.5",
    rate: "105000",
    status: "Paid",
    origin: "bc1qxyzabc123",
    destination: "48XyzMoneroAddress",
  },
  {
    id: "ORD-002",
    time: "2025-06-03 15:10",
    from: "ETH",
    to: "USDT",
    amount: "2.3",
    rate: "3200",
    status: "Pending",
    origin: "0x1234abc...",
    destination: "TetherWallet123",
  },
];

const getCoinIcon = (symbol) => {
  const iconClass = "inline-block mr-2 text-xl align-middle";
  switch (symbol) {
    case "BTC":
      return <FaBitcoin className={`text-yellow-400 ${iconClass}`} />;
    case "ETH":
      return <FaEthereum className={`text-blue-400 ${iconClass}`} />;
    case "USDT":
      return <SiTether className={`text-green-400 ${iconClass}`} />;
    case "XMR":
      return <SiMonero className={`text-orange-400 ${iconClass}`} />;
    case "BNB":
      return <SiBinance className={`text-yellow-300 ${iconClass}`} />;
    case "ADA":
      return <SiCardano className={`text-blue-300 ${iconClass}`} />;
    case "XRP":
      return <SiRipple className={`text-indigo-300 ${iconClass}`} />;
    default:
      return null;
  }
};

export default function Orders() {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div className="min-h-screen flex bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800 shadow-2xl shadow-green-500/10">
        <h2 className="text-xl font-bold mb-6">Панель</h2>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition">История заказов</button>
          <button className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition">Настройки</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <h1 className="text-3xl font-bold mb-6">История заказов</h1>

        <div className="overflow-x-auto rounded-xl shadow-xl shadow-green-500/10 border border-gray-700">
          <table className="min-w-full table-auto bg-gray-900 text-white">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-300">ID заказа</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">Время</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">От</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">Кому</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">Сумма</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">Курс</th>
                <th className="px-4 py-3 text-left text-sm text-gray-300">Статус</th>
                <th className="px-4 py-3 text-right text-sm text-gray-300">Действие</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <React.Fragment key={order.id}>
                  <tr
                    className={`border-b border-gray-700 transition ${
                      order.status === "Paid"
                        ? "bg-green-900/10"
                        : "bg-orange-900/10"
                    }`}
                  >
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.time}</td>
                    <td className="px-4 py-3 flex items-center">
                      {getCoinIcon(order.from)}
                      {order.from}
                    </td>
                    <td className="px-4 py-3 flex items-center">
                      {getCoinIcon(order.to)}
                      {order.to}
                    </td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">{order.rate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-green-700 text-white"
                            : "bg-orange-600 text-white"
                        }`}
                      >
                        {order.status === "Paid" ? "Оплачен" : "В ожидании"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpandedRow(expandedRow === idx ? null : idx)
                        }
                        className="text-gray-400 hover:text-white transition"
                      >
                        <FaRegEdit />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  <AnimatePresence>
                    {expandedRow === idx && (
                      <motion.tr
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-gray-800/60"
                      >
                        <td colSpan="8" className="px-4 py-4">
                          <div className="text-sm space-y-2">
                            <div>
                              <span className="text-gray-400 mr-2">Origin Wallet:</span>
                              <span className="text-white font-mono">{order.origin}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 mr-2">Destination Wallet:</span>
                              <span className="text-white font-mono">{order.destination}</span>
                            </div>
                            <div className="mt-3 flex space-x-3">
                              <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                                Отменить
                              </button>
                              <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                                Отметить как Оплачено
                              </button>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
