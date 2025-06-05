import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ordersData = [
  {
    id: "001",
    from: "BTC",
    to: "XMR",
    amount: "0.5",
    rate: "105000",
    originWallet: "bc1qexampleorigin",
    destinationWallet: "48xmrExampleDest",
    status: "Paid",
  },
  {
    id: "002",
    from: "ETH",
    to: "USDT",
    amount: "1.2",
    rate: "1800",
    originWallet: "0xexampleorigin",
    destinationWallet: "Tether123DestWallet",
    status: "Pending",
  },
];

function Orders() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getRowColor = (status) =>
    status === "Paid" ? "bg-green-100 text-green-900" : "bg-orange-100 text-orange-900";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Меню</h2>
        <nav className="space-y-2">
          <a href="#" className="block text-white hover:text-green-400">
            История заказов
          </a>
          <a href="#" className="block text-white hover:text-green-400">
            Настройки
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">История заказов</h1>

        <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-md">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-800 text-gray-300 uppercase">
              <tr>
                <th className="px-4 py-3">ID заказа</th>
                <th className="px-4 py-3">Отправка</th>
                <th className="px-4 py-3">Получение</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Курс</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Действие</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className={`${getRowColor(order.status)} border-b border-gray-700`}>
                    <td className="px-4 py-3 font-mono">{order.id}</td>
                    <td className="px-4 py-3">{order.from}</td>
                    <td className="px-4 py-3">{order.to}</td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">{order.rate}</td>
                    <td className="px-4 py-3 font-semibold">{order.status === "Paid" ? "Оплачен" : "В ожидании"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-gray-600 hover:text-white"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-900 border-b border-gray-700">
                      <td colSpan="7" className="px-6 py-4">
                        <div className="space-y-2 text-sm">
                          <div><strong>Кошелёк отправителя:</strong> {order.originWallet}</div>
                          <div><strong>Кошелёк получателя:</strong> {order.destinationWallet}</div>
                          <div className="mt-3 space-x-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                              Отменить
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                              Отметить как оплачено
                            </button>
                          </div>
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
