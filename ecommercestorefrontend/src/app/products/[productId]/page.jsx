"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../reducers/singleProductReducer";
import { addReview, fetchReviews } from "../../../reducers/reviewsReducer";
import { addItemToCart } from "../../../reducers/cartReducer";
import withAuth from "../../../../components/withAuth";
import { Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { BsCart } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ReviewsCard from "../../../../components/UI/ReviewsCard";

const ProductDetails = ({ params }) => {
  const { push } = useRouter();


  // Redux hooks
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const { reviews } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.user);

  // Local state
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [cartQuantity, setCartQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch product details and reviews on component mount
  useEffect(() => {
    dispatch(fetchProduct(params.productId || ""));
    dispatch(fetchReviews(params.productId || ""));
  }, [dispatch, params]);

  const handleIncrement = () => {
    setCartQuantity(cartQuantity + 1);
    onChange(cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      onChange(cartQuantity - 1);
    }
  };

  // Add To cart Function

  const handleAddToCart = async () => {
    try {
      // Dispatch add to cart action
      dispatch(addItemToCart({
        productId: params.productId,
        userId: user._id,
        cartQuantity
      }));

      setCartQuantity(1)

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Successfully Added To Cart',
        text: 'Thank',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error adding review:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Add review function
  const handleAddReview = async () => {
    try {
      // Dispatch addReview action
      dispatch(addReview({
        rating,
        comment,
        productId: params.productId,
        userId: user._id,
      }));

      // Reset form fields and close modal
      setRating("");
      setComment("");
      closeReviewModal();

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Review Submitted!',
        text: 'Thank you for your review.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error adding review:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };
// Dev Pulse Studio
  // Open modal function
  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeReviewModal = () => {
    setIsModalOpen(false);
  };

  // Render loading state while fetching data
  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  // Render error state if there's an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid>
      {/* Product details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center items-center lg:justify-start">
          <div className="w-full lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full rounded-lg border-1 border-gray-400 "
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-[2.1vmax] font-bold mb-4">{product.name}</h2>
            <p className="text-[1.1vmax] mb-4">
              <strong>Price:</strong> Rs.  {product.price}
            </p>
            <p className="mb-4 text-[1vmax] text-justify">
              <strong>Description:</strong> {product.description}
            </p>
            <div className="mb-3">
              <button
                className={`bg-gray-200 py-2 px-3 ${cartQuantity === 1 ? 'bg-gray-50' : 'hover:bg-gray-300'} text-1`}
                onClick={handleDecrement}
                disabled={cartQuantity === 1}
              >
                -
              </button>
              <span className="px-3 text-1">{cartQuantity}</span>
              <button className="bg-gray-200 py-2 px-3 hover:bg-gray-300 text-1 " onClick={handleIncrement}>+</button>
            </div>


            {/* Add to cart and add review buttons */}

            {user && <button
              className="bg-orange-600 hover:bg-orange-700 mr-2 text-white font-bold py-2 px-6  shadow-md"
              onClick={handleAddToCart}
            >
              Add to Cart <BsCart className="inline justify-center  " />
            </button>}
            {!user && <button
              className="bg-orange-600 hover:bg-orange-700 mr-2 text-white font-bold py-2 px-6  shadow-md"
              onClick={() => {
                push("/signIn");

              }}
            >
              Add to Cart
            </button>}


            {user && <button
              onClick={openReviewModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  shadow-md mt-2"
            >
              Add Review
            </button>}
            {!user && <button
              onClick={() => {
                push("/signIn");

              }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  shadow-md mt-2"
            >
              Add Review
            </button>}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <Container className="pb-3">
        <Row sm={4} xs={2} className="text-center items-center justify-center">
          {reviews?.map((review) => (
            <ReviewsCard
              key={review._id}
              firstName={review.userId.firstName}
              date={review.createdAt}
              comment={review.comment}
              rating={review.rating}
            />
          ))}
          {/* Render message if no reviews */}
          {reviews.length === 0 && <h1 className="text-[2vmax]">No Reviews Yet.</h1>}
        </Row>
      </Container>

      {/* Add review modal */}
      {isModalOpen && (
        <div className="fixed z-100000 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Review</h2>
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-2xl ${index <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  onClick={() => setRating(index)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddReview}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  shadow-md"
              >
                Submit Review
              </button>
              <button
                onClick={closeReviewModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6  shadow-md ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default withAuth(ProductDetails);