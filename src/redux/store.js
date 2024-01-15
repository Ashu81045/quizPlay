// store.js
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quizReducer"; // Update the path as needed

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
