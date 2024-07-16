import { configureStore } from "@reduxjs/toolkit";
import functionReducer from "./geminifunctionSlice";

// configure store
const store = configureStore({
  reducer: {
    function: functionReducer,
  },
});

export default store;
