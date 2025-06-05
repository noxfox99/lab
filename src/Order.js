// src/Orders.js
import React from "react";

const orders = [
  {
    id: "001",
    from: "BTC",
    to: "XMR",
    amount: "0.5",
    rate: "120000",
    status: "Paid",
  },
  {
    id: "002",
    from: "ETH",
    to: "USDT",
    amount: "1.2",
    rate: "1900",
    status: "Pending",
  },
  {
    id: "003",
    from: "USDT",
    to: "ADA",
    amount: "1000",
    rate: "0.35",
    status: "Paid",
  },
];

function Orders() {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-6">Меню</h2>
        <ul className="space-y-4">
          <li className="hover:text-green-400 cursor-pointer font-medium">История заказов</li>
          <li className="hover:text-green-400 cursor-pointer font-medium">Настройки</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">История заказов</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700 text-sm">
            <thead className="bg-gray-700 text-left">
              <tr>
                <th className="px-4 py-2 border border-gray-600">ID заказа</th>
                <th className="px-4 py-2 border border-gray-600">Отправлено</th>
                <th className="px-4 py-2 border border-gray-600">Получено</th>
                <th className="px-4 py-2 border border-gray-600">Сумма</th>
                <th className="px-4 py-2 border border-gray-600">Курс</th>
                <th className="px-4 py-2 border border-gray-600">Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={`${
                    order.status === "Paid"
                      ? "bg-green-900"
                      : "bg-yellow-900"
                  } border-b border-gray-700`}
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.from}</td>
                  <td className="px-4 py-2">{order.to}</td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">{order.rate}</td>
                  <td className="px-4 py-2">{order.status === "Paid" ? "Оплачен" : "В ожидании"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Orders;
