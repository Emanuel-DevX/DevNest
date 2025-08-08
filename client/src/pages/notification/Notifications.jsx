import fetcher from "@/lib/api";

import { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";

const Notifications = function () {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetcher("/notifications");
        setNotifications(res);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchNotifications();
  }, []);
  console.log(notifications);
  return (
    <>
      <div>
        <header>Notifications</header>

        <div className="flex flex-col gap-2 px-2">
          {notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              onDismiss={() => {}}
              onMarkAsRead={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
