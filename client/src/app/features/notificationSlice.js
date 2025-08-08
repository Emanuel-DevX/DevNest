import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.readAt).length;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.readAt) {
        state.unreadCount += 1;
      }
    },
    markAsReadLocal: (state, action) => {
      const notif = state.notifications.find((n) => n._id === action.payload);
      if (notif && !notif.readAt) {
        notif.readAt = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsReadLocal,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
