import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function UserAccountPage() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold text-green-600">Welcome, {user.name}!</h2>
        <p className="text-gray-500 mt-2">Manage your account settings and details.</p>

        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-700">Email: {user.email || "Not Provided"}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Member Since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
          </p>
        </div>

        <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}
