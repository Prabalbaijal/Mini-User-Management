import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchUsers = async (pageNumber = 1) => {
    const res = await api.get(
      `/api/admin/users?page=${pageNumber}&limit=${limit}`
    );

    setUsers(res.data.data.users);
    setPage(res.data.data.page);
    setTotalPages(res.data.data.totalPages);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const toggleStatus = async (userId, currentStatus) => {
    const nextStatus =
      currentStatus === "active" ? "inactive" : "active";

    if (
      !window.confirm(
        `Are you sure you want to ${nextStatus} this user?`
      )
    )
      return;

    try {
      setLoadingId(userId);

      await api.patch(`/api/admin/users/${userId}/status`, {
        status: nextStatus
      });

      // Optimistic update
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: nextStatus } : u
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update user status"
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Navbar />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-semibold mb-6">
            User Management
          </h1>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10 bg-[rgb(var(--card))] shadow-2xl">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.fullName}</td>
                    <td className="px-6 py-4 capitalize">
                      {u.role}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                          ${
                            u.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        disabled={loadingId === u._id}
                        onClick={() =>
                          toggleStatus(u._id, u.status)
                        }
                      >
                        {loadingId === u._id
                          ? "Updating..."
                          : u.status === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden mt-6 space-y-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="rounded-xl border border-white/10 bg-[rgb(var(--card))] p-4 shadow-xl"
              >
                <p className="break-all">{u.email}</p>
                <p className="mt-1">{u.fullName}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium
                      ${
                        u.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {u.status}
                  </span>

                  <Button
                    variant="ghost"
                    disabled={loadingId === u._id}
                    onClick={() =>
                      toggleStatus(u._id, u.status)
                    }
                  >
                    {loadingId === u._id
                      ? "Updating..."
                      : u.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
