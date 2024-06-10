"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "../../reducers/categoryReducer";
import Swal from "sweetalert2";

const CategoryPage = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  // Local state for input fields
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  // Function to add category
  const handleAddCategory = async () => {
    try {
      await dispatch(addCategory({ name }));
      setName("");

      // Show success message with auto-hide
      Swal.fire({
        icon: 'success',
        title: 'Category Added!',
        text: 'The category has been successfully added.',
        timer: 1000, // Auto-hide after 2000 milliseconds
        timerProgressBar: true,
        allowOutsideClick: false, // Prevent dismissing by clicking outside
      });
    } catch (error) {
      // Dev Pulse Studio
      console.error("Error adding category:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false, // Prevent dismissing by clicking outside
      });
    }
  };

  // Function to delete category
  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      // Success message
      Swal.fire({
        title: "Deleted!",
        text: "Your category has been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Function to populate edit form
  const handleEditCategory = (category) => {
    setName(category.name);
    setEditingCategory(category._id);
  };

  // Function to update category
  const handleUpdateCategory = async () => {
    try {
      await dispatch(updateCategory({ categoryId: editingCategory, categoryData: { name } }));
      setName("");
      setEditingCategory(null);
      // Success message
      Swal.fire({
        title: "Updated!",
        text: "Your category has been updated.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      {/* Add/Edit Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add/Edit Categories</h2>
        <div className="flex flex-col md:flex-row">
          {/* Input field for category name */}
          <input
            type="text"
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 w-full md:w-auto mb-2 md:mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Button for adding/editing category */}
          {editingCategory ? (
            <button
              onClick={handleUpdateCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md md:ml-2"
            // Dev Pulse Studio

            >
              Update Category
            </button>
          ) : (
            <button
              onClick={handleAddCategory}
              className="bg-green-500 text-white px-4 py-2 rounded-md md:ml-2"
            >
              Add Category
            </button>
          )}
        </div>
      </div>

      {/* View Categories */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">View Categories</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through categories to display in a table */}
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Buttons for editing and deleting categories */}
                  <div className="flex flex-wrap">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mb-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/*  Dev Pulse Studio */}
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;