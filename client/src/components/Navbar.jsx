import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-lg font-semibold">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            Logged in as {user?.fullName} ({user?.role})
          </p>
        </div>

        {/* Right */}
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
