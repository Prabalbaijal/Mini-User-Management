import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { logout } from "../features/auth/authSlice";

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
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Load profile
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        email: user.email
      });
    }
  }, [user]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await api.put("/api/user/profile", profile);
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      await api.put("/api/user/change-password", passwords);
      setMessage("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">My Profile</h1>
            <p className="text-sm text-gray-400">
              Manage your account information
            </p>
          </div>

          <Button variant="ghost" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-[rgb(var(--card))] p-6 shadow-2xl border border-white/10">
          <h2 className="text-xl font-medium mb-4">Profile Details</h2>

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
            className="mt-6"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Password Card */}
        <div className="rounded-2xl bg-[rgb(var(--card))] p-6 shadow-2xl border border-white/10">
          <h2 className="text-xl font-medium mb-4">Change Password</h2>

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
            className="mt-6"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>

        {/* Alerts */}
        {message && (
          <div className="text-green-400 text-sm">{message}</div>
        )}
        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
