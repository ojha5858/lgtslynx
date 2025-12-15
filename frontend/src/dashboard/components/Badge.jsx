export default function Badge({ text }) {
  const styles = {
    "High Authority": "bg-green-100 text-green-700",
    Growing: "bg-blue-100 text-blue-700",
    New: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${styles[text]}`}>
      {text}
    </span>
  );
}
