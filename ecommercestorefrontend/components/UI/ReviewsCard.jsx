import React from "react";
import { Card, Col } from "react-bootstrap";

const ReviewsCard = ({ firstName, date, comment, rating }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Col className="pt-[1vmax] " sm={6} md={3}>
      <div >
        <Card
          style={{ borderRadius: ".5vmax" }}
          className="items-center mx-[-.2vmax]"
        >
          <h1 className=" py-[1vmax] text-[1.3vmax]">{firstName}</h1>
          <div className="flex items-center">
            {/* Render stars based on rating */}
            {[...Array(rating)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 fill-current text-yellow-500 mr-1"
                viewBox="0 0 20 20"
              >
                {/* Dev Pulse Studio */}
                <path d="M10 0l2.4 6.7h7.6l-6 4.7 2.3 6.6-6-4.7-6 4.6 2.3-6.6-6-4.7h7.5z"></path>
              </svg>
            ))}
          </div>
          <p className="text-gray-800 text-[1vmax] mt-4">{comment}</p>
          <p className="text-[.7vmax] text-gray-600">{formatDate(date)}</p>
        </Card>
      </div>
    </Col>
  );
};

export default ReviewsCard;