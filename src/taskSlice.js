import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const taskSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    updateTasks: (action) => {
      console.log("NewTasklist--------", action.payload);
    },
    getTitle: (action) => {
      console.log("action.payload--------", action.payload);
      return { title: "Kanban Board" };
    },
  },
});

export const { updateTasks, getTitle } = taskSlice.actions;
export default taskSlice.reducer;
