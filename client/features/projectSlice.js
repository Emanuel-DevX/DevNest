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
    removeProject: (state, action) => {
      state.projectList = state.projectList.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

export const { setProjects, addProject, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
