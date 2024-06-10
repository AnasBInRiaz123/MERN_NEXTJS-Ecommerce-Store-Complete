"use client"

import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseUrl } from "../../config";
import Swal from "sweetalert2"; // Import SweetAlert
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert styles
import withAuth from "../../../components/withAuth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading state to true upon form submission
    e.preventDefault();
    try {
      // Send sign-up request to the server
      const url = `${baseUrl}/register`;
      const { data: res } = await axios.post(url, data);

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Sign Up successful!",
        text: "Redirecting to Sign In...",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to sign-in page after SweetAlert is closed
        router.push("/signIn");
      });

      console.log(res.message);
    } catch (error) {
      // Handle sign-up error
      console.error("Error signing up:", error)
// Dev Pulse Studio
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      // Set loading state to false after completing
      setLoading(false);
    }
  };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-600">Create Account</h1>
                    <p className="text-gray-600">Don't have an account? Sign up now!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name input */}
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={data.firstName}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {/* Last Name input */}
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {/* Password input */}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password type            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />

                        {/* Eye button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {showPassword ? (
                                <IoEyeOffOutline className="h-6 w-6 text-gray-400" />
                            ) : (
                                <IoEyeOutline className="h-6 w-6 text-gray-400" />
                            )}
                        </button>

                    </div>
                    {/* Error message */}
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-md">{error}</div>
                    )}
{/* // Dev Pulse Studio */}

                    {/* Sign up button */}
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 rounded-md w-full hover:bg-green-600 transition duration-300"
                        disabled={loading} // Disable the button when loading is true
                    >
                        {loading ? "Loading..." : "Sign Up"}{" "}
                        {/* Show Loading... text when loading is true */}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">Already have an account?</p>
                    {/* Link to sign-in page */}
                    <Link href="/signIn" className="text-green-600 underline">
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withAuth(SignUp)