'use client'
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fetchProducts } from "../../reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/UI/ProductCard";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products]);

    if (loading) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    // Display error message if there is an error fetching products
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <Container className="pt-[3vmax] pb-[5vmax]">
            <Row className="items-center justify-center">
                <Col>
                    <h1 className="text-center mt-[3vmax] mb-[2vmax] font-bold text-[2.6vmax] underline">
                        Featured Products</h1>
                </Col>
            </Row>
            {/* // Dev Pulse Studio */}

            <Row sm={4} xs={2} className="flex flex-1 justify-center">
                {products.slice(0, 8).map((product) => (
                    <ProductCard
                        key={product._id}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        id={product._id}
                    />
                ))}
            </Row>
        </Container>
    )
}

export default Products