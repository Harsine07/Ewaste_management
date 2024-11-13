import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/place-order'); // Fetch all orders
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Order Placed':
        return { color: 'bg-blue-500', text: 'text-white' }; // Order Placed
      case 'Assigned':
        return { color: 'bg-yellow-500', text: 'text-white' }; // Assigned
      default:
        return { color: 'bg-gray-500', text: 'text-white' }; // Unknown status
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Order Status</h1>

      {loading && <div className="text-lg text-gray-500">Loading orders...</div>}
      {error && <div className="text-lg text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {orders.map((order) => {
          const { color, text } = getStatusBadge(order.status);

          return (
            <div key={order.id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Order ID: {order.id}</h3>

                  <div className="mt-2 mb-4">
                    <h4 className="text-lg font-semibold text-gray-600">Order Details:</h4>
                    <ul className="text-lg list-disc list-inside mt-1 text-gray-700">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">{item.itemName}: {item.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Status section with a badge on the right, moved down slightly */}
                <div className="flex items-center ml-4 mt-4">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full ${color} ${text} text-lg font-medium`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;
