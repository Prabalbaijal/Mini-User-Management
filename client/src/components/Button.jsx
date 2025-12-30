export default function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary:
      "bg-accent hover:bg-indigo-500 shadow-glow text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
    ghost:
      "border border-slate-700 hover:bg-slate-800"
  };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md transition ${styles[variant]} bg-blue-400`}
    >
      {children}
    </button>
  );
}
