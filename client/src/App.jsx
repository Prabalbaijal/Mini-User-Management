import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./features/auth/authSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((s) => s.auth);

  //  REHYDRATE USER ON REFRESH
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe());
    }
  }, [token, user, dispatch]);

  //  WAIT until auth is resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
     <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#020617", // dark card
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.1)"
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#020617"
            }
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#020617"
            }
          }
        }}
      />
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        {/* ROOT DECISION */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/users" />
              ) : (
                <Navigate to="/profile" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* PROTECTED */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}
