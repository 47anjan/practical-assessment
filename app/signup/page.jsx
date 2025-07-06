"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";

// Zod schema for form validation
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const { signup, loading } = useAuth();
  const [status, setStatus] = useState({
    error: "",
    success: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setStatus({ error: "", success: false });

      await signup(data);

      setStatus({ error: "", success: true });
      // Optionally redirect or show success message
    } catch (error) {
      console.log("Submission error:", error);

      setStatus({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: false,
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 pt-12">
      <div className="container mx-auto px-6 py-12 md:px-12 lg:px-7">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-bold text-4xl text-yellow-900 mb-4">
                Join Us Today
              </h1>
              <p className="text-gray-700">
                Create your account to start ordering delicious food
              </p>
            </div>

            {/* Signup Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {status.error && (
                  <div className="p-3 mt-2 bg-red-50 border flex items-center justify-center border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{status.error}</p>
                  </div>
                )}

                {status.success && (
                  <div className="p-3 mt-2 bg-green-50 flex items-center justify-center border border-green-200 rounded-md">
                    <p className="text-green-600 text-sm">
                      Login successful! Redirecting...
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>
              </div>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-yellow-600 hover:text-yellow-500 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
