import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

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

        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}

        <Button
          className="w-full mt-6"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-accent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
