"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../reducers/categoryReducer";
import { fetchProducts, addProduct, deleteProduct, updateProduct } from "../../reducers/productReducer";
import Swal from "sweetalert2";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  // Dev Pulse Studio

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      dispatch(addProduct(formData));
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Added!',
        text: 'The product has been successfully added.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    }
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setCategory(product.category._id);
    setIsEditing(true);
    setSelectedProductId(product._id);
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);
      // Dev Pulse Studio

      dispatch(updateProduct({ productId: selectedProductId, productData: formData }));
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'The product has been successfully updated.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      dispatch(deleteProduct(productId));
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted!',
        text: 'The product has been successfully deleted.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
    setImage(null);
    setIsEditing(false);
    setSelectedProductId(null);
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <input
            // Dev Pulse Studio
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            className="mb-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="flex justify-end items-center">
            {isEditing ? (
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Update Product
              </button>
            ) : (
              <button
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Products List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-[.9vmax]">
            <tr>
              <th className="border border-gray-300 px-[.4vmax] py-2">Name</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Price</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Stock</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Description</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Category</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Image</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-[.9vmax]">
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.price}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.quantity}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.category.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <img
                    src={product.imageUrl}
                    className="h-16 w-16 object-cover"
                    alt="Product"
                  />
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 mt-1 text-white px-[.5vmax] py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white mt-1 px-[.5vmax] py-1 rounded-md"
                  >
                    {/* // Dev Pulse Studio */}

                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );



};

export default ProductPage;