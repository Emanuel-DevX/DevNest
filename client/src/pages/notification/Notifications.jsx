import fetcher from "@/lib/api";

const { useState, useEffect } = require("react");
const { default: NotificationCard } = require("./NotificationCard");

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
  return (
    <>
      <div>
        <header>Notifications</header>

        <div>
          {notifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
