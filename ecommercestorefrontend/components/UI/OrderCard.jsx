import React, { useState, useEffect } from 'react';

const OrderCard = ({ orderId, totalAmount, status, id, products, onCancel, orderPlacedTime }) => {
    const [orderStatus, setOrderStatus] = useState(status); // Local state to hold the order status
    const [timeRemaining, setTimeRemaining] = useState(0); // Local state to hold the remaining time until cancellation
    const isOrderCanceled = orderStatus === 'Canceled';

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timePassed = (currentTime - orderPlacedTime) / 1000; // Time passed since order placed in seconds
            const timeUntilCancellation = 60 - timePassed; // Time until cancellation in seconds (1 minute)
            setTimeRemaining(timeUntilCancellation);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [orderPlacedTime]);

    const handleCancelOrder = async () => {
        if (!isOrderCanceled) {
            try {
                await onCancel();
                setOrderStatus('Canceled');
            } catch (error) {
                console.error('Failed to cancel order:', error);
            }
        }
    };

    return (
        <>
            <div className='border-gray-200 bg-gray-50 border-2 p-2 mt-1 mb-3 relative'>
                <h4 className="border text-[1.5vmax] border-gray-300 px-[.4vmax] py-2">
                    Order #  {orderId}
                </h4>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="text-[.9vmax]">
                        <tr>
                            <th className="border border-gray-300 px-[.4vmax] py-2">Total Amount</th>
                            <th className="border border-gray-300 px-[.4vmax] py-2">Status</th>
                            <th className="border border-gray-300 px-[.4vmax] py-2">Products</th>
                            <th className="border border-gray-300 px-[.4vmax] py-2">Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-[.9vmax]">

                            <td className="border border-gray-300 px-[.4vmax] py-2">
                                {totalAmount}
                            </td>
                            <td className="border border-gray-300 px-[.4vmax] py-2">
                                {orderStatus}
                            </td>
                            <td className="border border-gray-300 px-[.4vmax] py-2">
                                {products.map(product => (
                                    <div key={product.productId._id} className='border-gray-200  bg-gray-50 flex border-2 p-2 mt-1 mb-3 '>
                                        <img src={product.productId.imageUrl} alt="" className='w-[2.5vmax] h-full' />
                                        <div className='pl-2'>
                                            <p className=' m-0'>{product.productId.name}</p>
                                            <p className='  m-0'>Rs: {product.productId.price}</p>
                                            <p className=' '>Quantity: {product.productId.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </td>
                            <td className="border border-gray-300 px-[.4vmax] py-2">
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={isOrderCanceled || timeRemaining <= 0}
                                    className={`mt-1 px-[.5vmax] py-1 rounded-md ${isOrderCanceled || timeRemaining <= 0 ? "bg-gray-300 text-gray-600" : "bg-red-500 text-white"}`}
                                >
                                    {isOrderCanceled ? 'Canceled' : 'Cancel Order'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OrderCard;