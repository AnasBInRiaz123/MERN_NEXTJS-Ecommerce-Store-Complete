'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCartsByUserId, deleteCartItem, fetchCartItem } from '../../reducers/cartReducer';
import CartCard from '../../../components/ui/CartCard';
import { Col, Container, Row } from "react-bootstrap";
import { addOrder } from '../../reducers/orderReducer';
import Swal from 'sweetalert2';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const userId = user._id;
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingAddressGoogleMap, setshippingAddressGoogleMap] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactNumberError, setContactNumberError] = useState("");

  const openOrderModal = () => {
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItem(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteCart = async (cartId) => {
    try {
      await dispatch(deleteCartItem(cartId));
      dispatch(fetchCartItem(userId)); // Fetch updated cart data
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
// Dev Pulse Studio
  const handleAddOrder = async () => {
    // Check if any required field is empty
    if (!shippingAddress || !shippingAddressGoogleMap || !contactNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
        confirmButtonText: 'OK',
      });
      return; // Exit function early
    }

    // Validate contact number
    if (!/^(\+\d{1,3})?(\d{7,15})$/.test(contactNumber)) {
      setContactNumberError("Please enter a valid contact number");
      return;
    } else {
      setContactNumberError("");
    }

    // Proceed with adding order
    try {
      const orderData = {
        userId: user._id,
        products: cart.map(item => ({
          productId: item.productId,
          cartQuantity: item.cartQuantity
        })),
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        shippingAddressGoogleMap:shippingAddressGoogleMap,
        contactNumber: contactNumber
      };

      await dispatch(addOrder(orderData));

      // Optional: Implement clearing the cart after placing order
      await dispatch(deleteAllCartsByUserId(userId));
      dispatch(fetchCartItem(userId)); // Fetch updated cart data

      setShippingAddress("");
      setshippingAddressGoogleMap("");
      setContactNumber("");

      closeOrderModal();
// Dev Pulse Studio
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: `Thank you for your order.`,
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.productId.price * cartItem.cartQuantity);
    }, 0);
  };

  const deliveryCharges = 200;
  const totalAmount = calculateTotalAmount() + deliveryCharges;

  return (
    <Container fluid className="">
      <Container className="pt-[3vmax] pb-[5vmax]">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {cart && cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <Row>
            <Col className='' sm={8}>
              {cart.map((cartItem) => (
                <div className='relative' key={cartItem._id}>
                  <CartCard className="absolute z-10"
                    imageUrl={cartItem.productId.imageUrl}
                    name={cartItem.productId.name}
                    price={cartItem.productId.price}
                    quantity={cartItem.cartQuantity}
                    cartId={cartItem._id}
                  />
                  <button
                    className="absolute z-10000 text-sm border-1 px-2 m-2  mb-2 border-red-500 top-0 right-0 w-auto text-red-500 p-1 rounded-3"
                    onClick={() => handleDeleteCart(cartItem._id)}
                    disabled={loading} // Disable button while deleting
                  >
                    {'X'}
                  </button>
                </div>
              ))}
            </Col>
            <Col sm={4}>
              <div className='border-gray-200 bg-gray-50 border-2 p-2 mb-2 '>
                <h3 className='pb-5'>Order Summary</h3>
                <p className='flex'>Total Price:<span className='text-end font-bold flex-1'> Rs. {calculateTotalAmount().toFixed(2)} </span></p>
                <p className='flex'>Delivery charges:<span className='text-end font-bold flex-1'> Rs.  {deliveryCharges.toFixed(2)} </span> </p>
                <p className='flex border-t-2  border-gray-600 pt-3'>Total Amount to be Paid : <span className='text-end font-bold flex-1'> Rs.  {totalAmount.toFixed(2)} </span></p>
                <button
                  className="bg-orange-600 hover:bg-orange-700 mr-2 text-white font-bold py-2 px-6  shadow-md"
                  onClick={openOrderModal}
                >
                  Check Out
                </button>
              </div>
            </Col>
          </Row>
        )}
        {isModalOpen && (
          <div className="fixed z-100000 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white max-h-[80vh] overflow-y-auto p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Check Out </h2>
              {/* Cart items */}
              {cart.map((cartItem) => (
                <div key={cartItem._id}>
{/* // Dev Pulse Studio */}

                  <CartCard
                    imageUrl={cartItem.productId.imageUrl}
                    name={cartItem.productId.name}
                    price={cartItem.productId.price}
                    quantity={cartItem.cartQuantity}
                    cartId={cartItem._id}
                  />
                  <button
                    className="text-sm border-1 mb-2 border-red-500 top-0 right-0 w-auto text-red-500 p-1"
                    onClick={() => handleDeleteCart(cartItem._id)}
                    disabled={loading}
                  >
                    {loading ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              ))}
              {/* Order summary */}
              <div className='border-gray-200 bg-gray-50 border-2 p-2 mb-2'>
                <p className='flex'>Total Price:<span className='text-end font-bold flex-1'> Rs. {calculateTotalAmount().toFixed(2)} </span></p>
                <p className='flex'>Delivery charges:<span className='text-end font-bold flex-1'> Rs. {deliveryCharges.toFixed(2)} </span> </p>
                <p className='flex border-t-2 border-gray-600 pt-3'>Total Amount to be Paid : <span className='text-end font-bold flex-1'> Rs. {totalAmount.toFixed(2)} </span></p>
              </div>
              {/* Add your content here */}
              <input
                placeholder="Shipping Address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
                <input
                placeholder="Pinned Google Map Location link"
                value={shippingAddressGoogleMap}
                onChange={(e) => setshippingAddressGoogleMap(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <input
                type='number'
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className={`border border-gray-300 rounded-md p-2 mb-2 w-full ${contactNumberError && 'border-red-500'}`}
              />
              {/* Display contact number error */}
              {contactNumberError && <p className="text-red-500">{contactNumberError}</p>}
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  shadow-md"
                  onClick={handleAddOrder}
                >
                  Place Order
                </button>
                <button
                  onClick={closeOrderModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6  shadow-md ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default CartPage;