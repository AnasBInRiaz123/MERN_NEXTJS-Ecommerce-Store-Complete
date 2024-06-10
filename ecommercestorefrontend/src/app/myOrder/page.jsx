'use client'
import React, { useEffect } from 'react';
import OrderCard from '../../../components/UI/OrderCard';
import { Container } from 'react-bootstrap';
import { fetchOrderByUserId, updateOrder } from '../../reducers/orderReducer';
import { useDispatch, useSelector } from 'react-redux';

const OrderPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const { user } = useSelector((state) => state.user);
    const userId = user._id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrderByUserId(userId));
        }
    }, [dispatch, userId]);
    // Dev Pulse Studio


    const handleCancelOrder = (orderId) => {
        dispatch(updateOrder({ orderId, status: "Canceled" }));

    };


    return (
        <Container fluid className="">
            <Container className="pt-[3vmax] pb-[5vmax]">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {orders && orders.length === 0 ? (
                    <p>You have not placed any order yet</p>
                ) : (
                    <div>
                        {orders.map((orderItem) => (
                            <OrderCard
                                key={orderItem._id}
                                orderId={orderItem._id}
                                totalAmount={orderItem.totalAmount}
                                status={orderItem.status} // Pass status prop here
                                id={orderItem._id}
                                products={orderItem.products} // Pass the products array
                                orderPlacedTime={orderItem.createdAt}
                                onCancel={() => handleCancelOrder(orderItem._id)} // Pass onCancel handler
                            // Dev Pulse Studio

                            />

                        ))}
                    </div>
                )}
            </Container>
        </Container>
    );
};

export default OrderPage;