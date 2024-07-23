import { configureStore } from "@reduxjs/toolkit";
import functionReducer from "./geminifunctionSlice";
import stableDiffusionReducer from "./stablediffusionSlice";

// configure store
const store = configureStore({
  reducer: {
    function: functionReducer,
    stableDiffusion: stableDiffusionReducer,
  },
});

export default store;
