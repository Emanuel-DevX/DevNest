import {store} from "@/app/store";
import { setNotifications } from "@/app/features/notificationSlice";
import fetcher from "./api";

async function fetchNotifications() {
  // Refresh notifications after each fetch
  try {
    const notifData = await fetcher("/notifications");
    console.log("called?")
    store.dispatch(setNotifications(notifData.notifications || notifData));
  } catch (err) {
    console.error("Error refreshing notifications:", err.message);
  }
}

export default fetchNotifications;
