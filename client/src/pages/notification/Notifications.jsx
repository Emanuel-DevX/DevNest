import fetcher from "@/lib/api";
import { setNotifications } from "@/app/features/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import NotificationCard from "./NotificationCard";

const Notifications = function () {
  const dispatch = useDispatch();
  const fetchNotifications = async () => {
    try {
      const res = await fetcher("/notifications");
      dispatch(setNotifications(res.notifications || res));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const markAsRead = async (id) => {
    try {
      await fetcher(`/notifications/${id}/read`, { method: "PATCH" });
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  const discardNotification = async (id) => {
    try {
      await fetcher(`/notifications/${id}`, { method: "DELETE" });
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  const markAllAsRead = async () => {
    try {
      await fetcher(`/notifications/read`, { method: "PATCH" });
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(notifications);
  return (
    <>
      <div>
        <header className="mb-2 flex items-center justify-between px-4 py-3 border-b border-zinc-700 bg-zinc-900/30 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium text-teal-300 hover:text-teal-400 transition-colors"
          >
            Mark all as read
          </button>
        </header>

        <div className="flex flex-col gap-2 px-2">
          {notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              onDismiss={discardNotification}
              onMarkAsRead={markAsRead}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
