import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submit = () => {
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    dispatch(login(form))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully");
      })
      .catch((err) => {
        toast.error(err || "Login failed");
      });
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/profile");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <div
        className="w-full max-w-md rounded-2xl 
        bg-[rgb(var(--card))] 
        p-8 shadow-2xl border border-white/10"
      >
        <h2 className="text-3xl font-semibold mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Login to continue
        </p>

        <div className="space-y-5">
          <Input
            label="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            label="Password"
            type="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>
            <br></br>
        <Button
          onClick={submit}
          className="w-full mt-8 py-2.5 
            bg-indigo-600 hover:bg-indigo-500 
            shadow-lg shadow-indigo-600/30 
            transition "
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}
