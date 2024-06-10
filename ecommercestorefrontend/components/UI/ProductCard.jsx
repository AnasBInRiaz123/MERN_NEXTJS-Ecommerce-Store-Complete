import React from "react";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { useRouter } from "next/navigation";


const ProductCard = ({ imageUrl, name, price, description, id }) => {
    const { push } = useRouter();
    const handleCardClick = () => {
        push(`/products/${id}`);
    };
    return (
        <Col sm={6} md={3} data-aos="flip-right" className="pt-[.75vmax] mt-3 justify-center align-center ">
            <div className="border-1 border-black  " onClick={handleCardClick} >
                <Card
                    style={{ borderRadius: ".5vmax", border: "none", alignItems: "center", cursor: "pointer" }}
                >
                    <img
                        className="h-[10vmax] w-[12vmax] mt-4 object-cover"
                        src={imageUrl}
                    />
                    <p className="m-0 px-4 pt-4 text-[1vmax] overflow-hidden whitespace-nowrap">
                        {name.length > 20 ? name.slice(0, 30) + '...' : name}
                        </p>
                    <p className="m-0 pt-2 pb-[.5vmax] font-bold text-[1vmax] text-gray-600">
                        Rs. {price}
                    </p>
                    {/* // Dev Pulse Studio */}


                </Card>
            </div>
        </Col>
    );
};

export default ProductCard;