import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/projectSlice";
import notificationReducer from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    notification: notificationReducer,
  },
});
