import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.orders) {
          const formattedOrders = response.data.orders.map(order => ({
            user: order.user,
            orderId: order.orderId,
            orderTime: new Date(order.orderTime).toLocaleString(),
            items: order.items.map(item => (
              <div key={item.product}>
                {item.product} - {item.quantity} x ${item.price}
              </div>
            )),
            totalPrice: order.totalPrice,
            shippingAddress: order.shippingAddress,
            status: order.status,
          }));

          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, currentStatus) => {
    // Define the next status based on the current status
    const nextStatus = currentStatus === 'Pending' ? 'Delivered' : currentStatus === 'Delivered' ? 'Cancelled' : 'Pending';

    try {
      const response = await axios.put(
          'http://localhost:3000/api/v1/admin/updateStatus',
          { orderId, status: nextStatus },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          }
      );

        console.log("Server response:", response.data);
        if (response.data.success) {
          setOrders(prevOrders =>
              prevOrders.map(order =>
                  order.orderId === orderId ? { ...order, status: nextStatus } : order
              )
          );
          alert('Order status updated successfully!');
        } else {
            alert('Failed to update order status: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        alert('Failed to update order status. Error: ' + error.message);
    }
  };

  const columns = [
    { name: "user", label: "User", options: { filter: true, sort: true } },
    { name: "orderId", label: "Order ID", options: { filter: false, sort: true } },
    { name: "orderTime", label: "Order Time", options: { filter: false, sort: true } },
    { name: "items", label: "Items", options: { filter: false, sort: false } },
    { name: "totalPrice", label: "Total Price", options: { filter: false, sort: true } },
    { name: "shippingAddress", label: "Shipping Address", options: { filter: false, sort: false } },
    { 
      name: "status", 
      label: "Order Status", 
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const orderId = tableMeta.rowData[1]; // Assuming orderId is the second column
          return (
            <button
              onClick={() => handleStatusChange(orderId, value)}
              style={{
                padding: "5px 10px",
                backgroundColor: value === "Pending" ? "orange" : value === "Delivered" ? "green" : "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {value}
            </button>
          );
        }
      } 
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order List</h2>
      <MUIDataTable
        title={"Orders"}
        data={orders}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default AdminOrderList;
