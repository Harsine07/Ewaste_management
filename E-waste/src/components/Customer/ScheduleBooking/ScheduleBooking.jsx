import React, { useState } from 'react';
import { ExcelFile, ExcelSheet } from 'react-data-export'; // You'll need to install this package

const ScheduleBooking = () => {
  const [orderDate, setOrderDate] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new order to the orders array
    const newOrder = { orderDate, itemName, quantity };
    setOrders([...orders, newOrder]);

    // Reset the form fields
    setOrderDate('');
    setItemName('');
    setQuantity('');
  };

  // Function to generate the data for the Excel export
  const getExcelData = () => {
    return orders.map((order, index) => ({
      key: index + 1,
      orderDate: order.orderDate,
      itemName: order.itemName,
      quantity: order.quantity,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Schedule a Booking</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Order Placing</label>
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded-lg p-2">
          Submit
        </button>
      </form>

      {/* Display the table if there are orders */}
      {orders.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Orders List</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Order Date</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{order.orderDate}</td>
                  <td className="border border-gray-300 p-2">{order.itemName}</td>
                  <td className="border border-gray-300 p-2">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExcelFile
            filename="Orders"
            element={
              <button className="bg-green-500 text-white rounded-lg p-2 mt-4">
                Export to Excel
              </button>
            }
          >
            <ExcelSheet data={getExcelData()} name="Orders">
              <ExcelFile name="Order List" />
            </ExcelSheet>
          </ExcelFile>
        </div>
      )}
    </div>
  );
};

export default ScheduleBooking;
