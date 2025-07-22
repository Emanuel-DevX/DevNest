import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectList: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projectList = action.payload;
    },
    addProject: (state, action) => {
      state.projectList.push(action.payload);
    },
    updateProject: (state, action) => {
      const updated = action.payload;
      const index = state.projectList.findIndex((p) => p._id === updated._id);
      if (index !== -1) {
        state.projectList[index] = updated;
      }
    },
    removeProject: (state, action) => {
      state.projectList = state.projectList.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

export const { setProjects, updateProject, addProject, removeProject } =
  projectSlice.actions;

export default projectSlice.reducer;
