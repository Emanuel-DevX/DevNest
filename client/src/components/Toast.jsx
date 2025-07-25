// components/Toast.jsx
import { useEffect } from "react";
import { X } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-emerald-600 border-emerald-700"
      : "bg-rose-600 border-rose-700";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 border text-white rounded-md shadow-lg ${bgColor}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:opacity-75">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
