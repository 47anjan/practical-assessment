"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

// Zod schema for login form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { login, loading, user } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState({
    error: "",
    success: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  if (user) {
    router.push("/");
  }

  const onSubmit = async (data) => {
    try {
      setStatus({ error: "", success: false });

      await login(data);

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
    <div className="min-h-screen bg-yellow-50">
      <div className="container mx-auto px-6 py-12 md:px-12 lg:px-7">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-bold text-4xl text-yellow-900 mb-4">
                Welcome Back
              </h1>
              <p className="text-gray-700">
                Sign in to your account to continue ordering
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
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
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
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
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
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
                      Or sign in with
                    </span>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-yellow-600 hover:text-yellow-500 font-medium transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
