export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isTaskCompleteOnDate = (task, targetDate) => {
  const target = new Date(targetDate);
  const targetDateStr = target.toLocaleDateString("en-CA");

  const schedule = task.userSchedule;
  if (schedule?.recurring?.isRecurring) {
    const match = schedule.recurring.occurrences.find((o) => {
      const occDateStr = new Date(o.date).toISOString().split("T")[0];
      return occDateStr === targetDateStr;
    });
    return match?.done;
  }

  return task.completed || false;
};

export const getTimeRangeString = (startDate, durationMinutes) => {
  if (!startDate || !durationMinutes) return { startTime: "", endTime: "" };
  const start = new Date(startDate);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const format = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return {
    startTime: isNaN(start) ? "Invalid Date" : format(start),
    endTime: isNaN(end) ? "Invalid Date" : format(end),
  };
};

export const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
