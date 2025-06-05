import React, { useState } from "react";
import { FaBitcoin, FaEthereum, FaRegEdit } from "react-icons/fa";
import { SiTether, SiBinance, SiMonero, SiCardano, SiRipple } from "react-icons/si";

const coinIcons = {
  BTC: <FaBitcoin className="text-yellow-400" />,
  ETH: <FaEthereum className="text-purple-400" />,
  USDT: <SiTether className="text-green-400" />,
  BNB: <SiBinance className="text-yellow-300" />,
  XMR: <SiMonero className="text-orange-500" />,
  ADA: <SiCardano className="text-blue-400" />,
  XRP: <SiRipple className="text-indigo-400" />,
};

const orders = [
  {
    id: "ORD12345",
    time: "04.06.2025, 13:45",
    from: "BTC",
    to: "XMR",
    amount: "0.5",
    rate: "105000",
    originWallet: "bc1qexampleorigin",
    destinationWallet: "44Affq5kexampledest",
    status: "Paid",
  },
  {
    id: "ORD12346",
    time: "04.06.2025, 14:12",
    from: "ETH",
    to: "USDT",
    amount: "1.2",
    rate: "3200",
    originWallet: "0xoriginwallet",
    destinationWallet: "TDESTwallet123",
    status: "Pending",
  },
];

function Orders() {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Меню</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-300 hover:text-white">История заказов</a>
          <a href="#" className="block text-gray-300 hover:text-white">Настройки</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">История заказов</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow-xl rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-300 text-sm">
                <th className="px-4 py-3 whitespace-nowrap">ID заказа</th>
                <th className="px-4 py-3 whitespace-nowrap">Время</th>
                <th className="px-4 py-3 whitespace-nowrap">Отправлено</th>
                <th className="px-4 py-3 whitespace-nowrap">Получено</th>
                <th className="px-4 py-3 whitespace-nowrap">Сумма</th>
                <th className="px-4 py-3 whitespace-nowrap">Курс</th>
                <th className="px-4 py-3 whitespace-nowrap">Статус</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <tr
                    className={`transition-colors ${
                      order.status === "Paid"
                        ? "bg-green-900/30 hover:bg-green-900/40"
                        : "bg-orange-900/30 hover:bg-orange-900/40"
                    } text-sm text-white shadow-inner`}
                  >
                    <td className="px-4 py-3 font-mono text-sm whitespace-nowrap">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.time}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {coinIcons[order.from]}
                        <span>{order.from}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {coinIcons[order.to]}
                        <span>{order.to}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.rate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-green-700 text-white shadow-green-500/50 shadow-sm"
                            : "bg-orange-600 text-white shadow-orange-400/50 shadow-sm"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="text-gray-300 hover:text-white transition"
                        onClick={() => toggleExpand(index)}
                      >
                        <FaRegEdit />
                      </button>
                    </td>
                  </tr>

                  {expandedRow === index && (
                    <tr className="bg-gray-800/40 text-sm text-gray-200 shadow-inner">
                      <td colSpan="8" className="px-6 py-4">
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
                          <div>
                            <span className="text-gray-400 text-xs">Origin Wallet:</span>
                            <div className="font-mono break-all">{order.originWallet}</div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Destination Wallet:</span>
                            <div className="font-mono break-all">{order.destinationWallet}</div>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow shadow-red-500/30 transition">
                            Отменить
                          </button>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow shadow-green-500/30 transition">
                            Оплачено
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Orders;
