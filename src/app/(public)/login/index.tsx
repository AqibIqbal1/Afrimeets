"use client";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    if (!payload.email || !payload.password) {
      enqueueSnackbar("Email and Password are required", { variant: "error" });
      return;
    }
    try {
      const response = await login(payload);
      enqueueSnackbar("Login Successful", { variant: "success" });
      if (response?.data?.token) {
        document.cookie = `auth-token=${response?.data?.token}; path=/; SameSite=Lax`;
        router.replace("/home");
      }
      console.log("Login Response !:", response?.data?.token);
    } catch (error: any) {
      enqueueSnackbar(error?.response?.data || error.message, {
        variant: "error",
      });
      console.log("Login Error:", error?.response?.data || error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={payload.password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
