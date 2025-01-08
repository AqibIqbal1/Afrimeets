"use client";
import { signUp } from "@/api/auth";
import React, { useState } from "react";

const Signup: React.FC = () => {
  const [payload, setPayload] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await signUp(payload);
      console.log("Signup Response:", response?.data);
    } catch (error: any) {
      console.log("Signup Error:", error?.data?.error?.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            User Name:
          </label>
          <input
            type="text"
            id="fullname"
            value={payload.username}
            onChange={(e) =>
              setPayload({ ...payload, username: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
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
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
