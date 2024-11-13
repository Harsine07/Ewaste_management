import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTracking = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) {
        console.error('Agent ID not found');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/assigned-orders/agent/${agentId}`
        );
        setAssignedOrders(response.data); // The data should include each order's status
      } catch (error) {
        console.error('Error fetching assigned orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedOrders();
  }, []);

  const handleOrderStatus = async (orderId, currentStatus) => {
    let newStatus;

    // Define the next status based on the current status
    if (currentStatus === 'Initiate Order') {
      newStatus = 'Mark as Done';
    } else if (currentStatus === 'Mark as Done') {
      newStatus = 'Completed';
    } else {
      return; // No further updates once status is "Completed"
    }

    try {
      // Update order status in the backend to make the change persistent
      await axios.put(`http://localhost:5000/api/place-order/${orderId}/status`, {
        status: newStatus,
      });

      // Update the order status in the state to reflect the change
      setAssignedOrders(prevOrders =>
        prevOrders.map(order =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-lg">
          {assignedOrders.length > 0 ? (
            assignedOrders.map((order) => (
              <div key={order.order_id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h3>
                <ul className="list-disc list-inside mb-4">
                  {order.items ? (
                    order.items.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.itemName}: {item.quantity}
                      </li>
                    ))
                  ) : (
                    <li>No items assigned.</li>
                  )}
                </ul>
                <button
                  onClick={() => handleOrderStatus(order.order_id, order.status || 'Initiate Order')}
                  className={`w-full px-4 py-2 text-white rounded-md ${
                    order.status === 'Mark as Done'
                      ? 'bg-green-600 hover:bg-green-700'
                      : order.status === 'Completed'
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={order.status === 'Completed'} // Disable button if status is "Completed"
                >
                  {order.status || 'Initiate Order'}
                </button>
              </div>
            ))
          ) : (
            <p>No orders assigned to you at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
