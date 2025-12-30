import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [profile, setProfile] = useState({
    fullName: "",
    email: ""
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // Load profile from redux
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        email: user.email
      });
    }
  }, [user]);

  const updateProfile = async () => {
    if (!profile.fullName || !profile.email) {
      toast.error("Full name and email are required");
      return;
    }

    try {
      setLoading(true);
      await api.put("/api/user/profile", profile);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      toast.error("Both password fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.put("/api/user/change-password", passwords);
      toast.success("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">My Profile</h1>
            <p className="text-gray-400 mt-1">
              Welcome {user?.fullName}
            </p>
          </div>

          <Button variant="ghost" className="cursor-pointer" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-[rgb(var(--card))] p-6 shadow-2xl border border-white/10">
          <h2 className="text-xl font-medium mb-4">
            Profile Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
            />

            <Input
              label="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <Button
            onClick={updateProfile}
            className="mt-6 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Password Card */}
        <div className="rounded-2xl bg-[rgb(var(--card))] p-6 shadow-2xl border border-white/10">
          <h2 className="text-xl font-medium mb-4">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Old Password"
              type="password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  oldPassword: e.target.value
                })
              }
            />

            <Input
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value
                })
              }
            />
          </div>

          <Button
            onClick={changePassword}
            className="mt-6 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
