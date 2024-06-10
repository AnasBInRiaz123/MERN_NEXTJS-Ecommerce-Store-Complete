import React from 'react';

const AdminOrderCard = ({ orderId, totalAmount, products, costumerName, shippingAddress, googleMapAddress, contactNo }) => {
    return (
        <>
            <div className=' p-2 mt-1 mb-3 relative'>
                <h4 className="border text-[1.5vmax]-2 border-gray-100 px-[.4vmax] py-2">
                    Order #  {orderId}
                </h4>
                <table className="w-full border-collapse border-2 border-gray-100">
                    <thead className="text-[.9vmax]">
                        <tr>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Costumer Name</th>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Products</th>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Total Amount</th>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Shipping Address</th>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Google Map Address</th>
                            <th className="border-2 border-gray-100 px-[.4vmax] py-2">Contact No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping through products to display in a table */}
                        <tr className="text-[.9vmax]">
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {costumerName}
                            </td>
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {products.map(product => (
                                    <div key={product.productId._id} className='border-gray-200  bg-gray-50 flex border-2 p-2 mt-1 mb-3 '>
                                        {/* Conditionally render the image only on larger screens */}
                                        <img src={product.productId.imageUrl} alt="" className='w-[2.5vmax] h-full hidden md:block' />
                                        <div className='pl-2'>
                                            <p className=' m-0'>{product.productId.name}</p>
                                            <p className='  m-0'>Rs: {product.productId.price}</p>
                                            <p className=' '>Quantity: {product.cartQuantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </td>
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {totalAmount}
                            </td>
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {shippingAddress}
                            </td>
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {googleMapAddress}
                            </td>
                            <td className="border-2 border-gray-100 px-[.4vmax] py-2">
                                {contactNo}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminOrderCard;