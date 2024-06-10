'use client';
import React, { useEffect, useState } from 'react';
import AdminOrderCard from '../../../components/UI/AdminOrderCard'
import { Container, Button } from 'react-bootstrap'; // Import Button component
import { fetchAllOrders, updateOrder } from '../../reducers/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../../../components/withAuth';

const AdminOrderPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const [selectedStatuses, setSelectedStatuses] = useState({}); // State to store the selected status for each order

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, status) => {
        // Dispatch an action to update order status
        dispatch(updateOrder({ orderId, status }))
            .then(() => {
                // After the status is updated successfully, fetch all orders again to reflect the changes
                dispatch(fetchAllOrders());
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    const handleUpdateClick = (orderId) => {
        const status = selectedStatuses[orderId];
        if (status) {
            handleStatusChange(orderId, status);
        } else {
            console.error('No status selected');
        }
    };
// Dev Pulse Studio

    const handleStatusSelect = (orderId, status) => {
        setSelectedStatuses(prevState => ({
            ...prevState,
            [orderId]: status,
        }));
    };

    return (
        <Container fluid className="">
            <Container className="pt-[3vmax] pb-[5vmax]">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {orders && orders.length === 0 ? (
                    <p>You have not placed any order yet</p>
                ) : (
// Dev Pulse Studio

                    <div  >
                        {orders.map((orderItem) => (
                            <div className='border-gray-300 bg-gray-200 border-2 mb-4' key={orderItem._id}>
                                <AdminOrderCard
                                    orderId={orderItem._id}
                                    totalAmount={orderItem.totalAmount}
                                    products={orderItem.products}
                                    costumerName={orderItem.userId.firstName}
                                    shippingAddress={orderItem.shippingAddress}
                                    googleMapAddress={orderItem.shippingAddressGoogleMap}
                                    contactNo={orderItem.contactNumber}
                                />
                                <div className='border-gray-300 bg-gray-50 border-2 p-2  m-2 justify-center text-center'>
                                    <p>Current Status: {orderItem.status}</p> {/* Display current status */}
                                    <select
                                        value={selectedStatuses[orderItem._id] || ''}
                                        onChange={(e) => handleStatusSelect(orderItem._id, e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
{/* // Dev Pulse Studio */}

                                    <Button onClick={() => handleUpdateClick(orderItem._id)}>Update</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </Container>
    );
}

export default withAuth(AdminOrderPage);