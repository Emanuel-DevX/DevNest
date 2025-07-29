// PushDueDateModal.jsx
import { useState } from "react";
import { X, CalendarDays } from "lucide-react";
import DarkDatePicker from "../../../components/DatePicker";

export default function PushDueDateModal({ currentDueDate, onPush, onClose }) {
  const [newDate, setNewDate] = useState(() => {
    const iso = new Date().toISOString();
    return iso.slice(0, iso.indexOf("T"));
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <CalendarDays className="text-teal-400 w-6 h-6" />
          <h2 className="text-xl font-semibold text-white">Push Due Date</h2>
        </div>
        <p className="text-gray-300 mb-3">
          Current due date:{" "}
          <strong>{new Date(currentDueDate).toLocaleDateString()}</strong>
        </p>
        <DarkDatePicker
          type="date"
          value={newDate}
          minDate={new Date().toISOString().split("T")[0]}
          onChange={(d) => setNewDate(d)}
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600"
        />

        <button
          onClick={() => onPush(newDate)}
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium"
        >
          Update Due Date
        </button>
      </div>
    </div>
  );
}
