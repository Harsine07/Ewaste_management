import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon for the button

const ScheduleBooking = () => {
  const [orderDate, setOrderDate] = useState('');
  const [items, setItems] = useState([{ itemName: '', quantity: '' }]); // Initialize with one row
  const [orders, setOrders] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false); // State to control success message visibility
  const [company, setCompany] = useState(''); // State to store selected company
  const [nearbyCompanies, setNearbyCompanies] = useState([]); // State to store nearby companies

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderDate || !company) return; // Ensure company is selected

    const newOrder = { orderDate, items, company };
    setOrders([...orders, newOrder]);
    setOrderDate('');
    setItems([{ itemName: '', quantity: '' }]); // Reset items to one empty row
    setCompany(''); // Reset company
  };

  const handleItemChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([...items, { itemName: '', quantity: '' }]); // Add a new empty row
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      orders.flatMap(order =>
        order.items.map(item => ({
          'Order Date': order.orderDate,
          'Item Name': item.itemName,
          'Quantity': item.quantity,
          'Company': order.company,
        }))
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'Orders.xlsx');
  };

  const placeOrder = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const searchNearbyCompanies = () => {
    // Here you would implement the logic to fetch nearby companies based on user's location
    // For now, let's simulate with mock data
    setNearbyCompanies([
      'E-Waste Recycling Co. 1',
      'E-Waste Recycling Co. 2',
      'E-Waste Recycling Co. 3',
      'E-Waste Recycling Co. 4',
      'E-Waste Recycling Co. 5',
    ]);
  };

  const selectCompany = (companyName) => {
    setCompany(companyName);
    setNearbyCompanies([]); // Clear the list after selection
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-green-400 to-blue-500 bg-opacity-25"
         style={{
           backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", // Subtle background pattern
           backgroundSize: 'cover',
         }}>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Schedule a Booking</h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">Date of Order Placing</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Item Rows */}
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex mb-4 space-x-2">
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(event) => handleItemChange(index, event)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(event) => handleItemChange(index, event)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button type="button" onClick={addItemRow} className="bg-blue-500 text-white rounded-lg p-3 mb-4 hover:bg-blue-600 transition duration-300 w-full">
            Add Another Item
          </button>

          {/* E-Waste Company Selection */}
          <h3 className="text-lg font-semibold mb-2">Select E-Waste Company</h3>
          <button type="button" onClick={searchNearbyCompanies} className="bg-green-500 text-white rounded-lg p-3 mb-4 hover:bg-green-600 transition duration-300 w-full">
            Search Nearby E-Waste Companies
          </button>
          {nearbyCompanies.length > 0 && (
            <ul className="mb-4 border border-gray-300 rounded-lg p-2 max-h-48 overflow-auto">
              {nearbyCompanies.map((companyName, index) => (
                <li key={index} className="cursor-pointer text-blue-600 hover:underline p-2" onClick={() => selectCompany(companyName)}>
                  {companyName}
                </li>
              ))}
            </ul>
          )}
          <p className="text-gray-600">Selected Company: <span className="font-semibold">{company || 'None'}</span></p>

          <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition duration-300 w-full">
            Submit
          </button>
        </form>

        {orders.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Orders List</h3>
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3">Order Date</th>
                  <th className="border border-gray-300 p-3">Item Name</th>
                  <th className="border border-gray-300 p-3">Quantity</th>
                  <th className="border border-gray-300 p-3">Company</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, orderIndex) => (
                  order.items.map((item, itemIndex) => (
                    <tr key={`${orderIndex}-${itemIndex}`} className="hover:bg-gray-100">
                      {itemIndex === 0 && ( // Show order date only for the first item
                        <td className="border border-gray-300 p-3" rowSpan={order.items.length}>
                          {order.orderDate}
                        </td>
                      )}
                      <td className="border border-gray-300 p-3">{item.itemName}</td>
                      <td className="border border-gray-300 p-3">{item.quantity}</td>
                      <td className="border border-gray-300 p-3">{order.company}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
            <button onClick={exportToExcel} className="bg-green-500 text-white rounded-lg p-3 mt-4 hover:bg-green-600 transition duration-300">
              Export to Excel
            </button>
          </div>
        )}

        {/* Place Order Button */}
        <button onClick={placeOrder} className="flex items-center justify-center bg-indigo-600 text-white rounded-lg p-3 mt-4 hover:bg-indigo-700 transition duration-300 w-full">
          <FaCheckCircle className="mr-2" /> Place Order
        </button>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 text-green-600 font-semibold text-center">
            Your order has been placed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleBooking;
