import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export function makeStore() {
  return configureStore({
    reducer: taskReducer,
  });
}

export const store = makeStore();
