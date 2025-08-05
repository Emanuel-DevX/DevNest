import { DateTime } from "luxon";
const APP_TIMEZONE = "America/Vancouver";

export const getLocalDateString = (date = new Date()) => {
  // Use the actual local date, not UTC
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const isTaskCompleteOnDate = (task, targetDate) => {
  const schedule = task.userSchedule;
  return schedule?.done || task.completed || false;
};

export const getTimeRangeString = (startDate, durationMinutes) => {
  if (!startDate || !durationMinutes) return { startTime: "", endTime: "" };

  // Parse the date and ensure it's treated consistently
  const start = new Date(startDate);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const format = (date) => {
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return {
    startTime: format(start),
    endTime: format(end),
  };
};

export const isSameDay = (date1, date2) => {
  const d1 = toLocalDateOnly(date1);
  const d2 = toLocalDateOnly(date2);
  return d1.getTime() === d2.getTime();
};

export const generateTimeOptions = (intervalMinutes = 30) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const displayTime = new Date(
        `2000-01-01T${timeString}`
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      times.push({ value: timeString, display: displayTime });
    }
  }
  return times;
};

export const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
export const toLocalDateOnly = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const toUTCDateStringLuxon = (localDateStr) => {
  return DateTime.fromISO(localDateStr, { zone: "America/Vancouver" })
    .toUTC()
    .toISODate(); // returns YYYY-MM-DD in UTC
};
export const toUTCDateString = (date) => {
  console.log(date);
  return new Date(date).toISOString().split("T")[0];
};

export const getUTCDayRange = (localDate) => {
  // Create start and end of day in the app's timezone
  const startOfDay = DateTime.fromJSDate(localDate, { zone: APP_TIMEZONE })
    .startOf("day")
    .toUTC();

  const endOfDay = DateTime.fromJSDate(localDate, { zone: APP_TIMEZONE })
    .endOf("day")
    .toUTC();

  return {
    startDate: startOfDay.toISO(),
    endDate: endOfDay.toISO(),
  };
};

export const toLocalDateOnlyUTC = (date) => {
  const d = new Date(date);
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
};

export const getDateRangeForAPI = (startDate, endDate) => {
  const start = DateTime.fromJSDate(new Date(startDate), { zone: APP_TIMEZONE })
    .startOf("day")
    .toUTC()
    .toISO();

  const end = DateTime.fromJSDate(new Date(endDate), { zone: APP_TIMEZONE })
    .endOf("day")
    .toUTC()
    .toISO();

  return { startDate: start, endDate: end };
};

// Format date for display
export const formatDateForDisplay = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Check if selected date is today
export const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getMonthRangeUTC = (date) => {
  // start of month (local)
  const startLocal = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  // end of month (local)
  const endLocal = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return {
    startDate: startLocal.toISOString(),
    endDate: endLocal.toISOString(),
  };
};

// Get calendar data
export const getCalendarData = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  // Convert to our format where Monday = 0
  const startDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = lastDay.getDate();
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Fill remaining cells to complete the grid (35 cells = 5 rows × 7 days)
  while (calendarDays.length < 35) {
    calendarDays.push(null);
  }

  return calendarDays;
};
