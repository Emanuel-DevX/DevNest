import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

export default function DarkDatePicker({
  value,
  onChange,
  placeholder = "Select date...",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  const datePickerRef = useRef(null);

  const handleContainerClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div
      className="relative w-full group cursor-pointer"
      onClick={handleContainerClick}
    >
      <DatePicker
        shouldCloseOnSelect
        selected={value}
        onChange={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
        onInputClick={() => setIsOpen(true)}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        showPopperArrow={false}
        placeholderText={placeholder}
        calendarClassName="!bg-zinc-900 !text-white !border-gray-600 !shadow-2xl !rounded-lg"
        dayClassName={(date) =>
          "hover:!bg-teal-600 hover:!text-white !transition-all !duration-200 !rounded-md !mx-1 !font-medium !text-white " +
          "focus:!bg-teal-600 focus:!text-white active:!scale-95"
        }
        weekDayClassName={() => "!text-teal-300 !font-semibold !text-xs"}
        monthClassName={() =>
          "hover:!bg-gray-700 !transition-colors !rounded-lg"
        }
        timeClassName={() => "hover:!bg-gray-700 !transition-colors"}
        popperClassName="!z-50"
        popperPlacement="bottom-start"
        className="w-full px-4 py-2 pr-12 rounded-md bg-gray-800 text-gray-100 border border-gray-600 
                   placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 
                   transition-all duration-200 hover:bg-gray-700 cursor-pointer"
        {...props}
      />

   
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarDays className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-300" />
      </div>

      {/* Custom styles to override react-datepicker defaults */}
      <style>{`
        .react-datepicker__header {
          background-color: rgb(39 39 42) !important;
          border-bottom: 1px solid rgb(82 82 91) !important;
          border-radius: 0.5rem 0.5rem 0 0 !important;
          padding: 8px !important;
        }

        .react-datepicker__current-month {
          color: white !important;
          font-weight: 600 !important;
          font-size: 1.1rem !important;
          margin-bottom: 8px !important;
        }

        .react-datepicker__navigation {
          top: 12px !important;
          width: 20px !important;
          height: 20px !important;
        }

        .react-datepicker__navigation--previous {
          left: 12px !important;
          border-right-color: rgb(156 163 175) !important;
        }

        .react-datepicker__navigation--next {
          right: 12px !important;
          border-left-color: rgb(156 163 175) !important;
        }

        .react-datepicker__navigation:hover *::before {
          border-color: white !important;
        }

        .react-datepicker__day--selected {
          background-color: rgb(13 148 136) !important;
          color: white !important;
          border-radius: 0.375rem !important;
          font-weight: 600 !important;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: rgb(82 82 91) !important;
          color: white !important;
        }

        .react-datepicker__day--today {
          background-color: rgb(63 63 70) !important;
          color: rgb(45 212 191) !important;
          font-weight: 600 !important;
          border-radius: 0.375rem !important;
        }

        .react-datepicker__day--outside-month {
          color: rgb(113 113 122) !important;
        }

        .react-datepicker__day--disabled {
          color: rgb(120 120 130) !important;
          background-color: transparent !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
          text-decoration: line-through;
          opacity: 0.4;
        }

        .react-datepicker__month-container {
          background-color: rgb(39 39 42) !important;
        }

        .react-datepicker__month {
          background-color: rgb(39 39 42) !important;
        }

        .react-datepicker__triangle {
          display: none !important;
        }

        .react-datepicker__day-names {
          border-bottom: 1px solid rgb(82 82 91) !important;
          margin-bottom: 4px !important;
        }
      `}</style>
    </div>
  );
}
