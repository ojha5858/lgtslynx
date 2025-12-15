export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
}
