import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submit = () => {
    if (!form.fullName || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(
      signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Account created successfully");
      })
      .catch((err) => {
        toast.error(err || "Signup failed");
      });
  };

  //  Redirect after successful signup
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <div className="bg-[rgb(var(--card))] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/10">
        <h2 className="text-3xl font-semibold mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Join the platform
        </p>

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <Button
          className="w-full mt-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
