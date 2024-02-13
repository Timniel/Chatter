// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { pocketBaseAuthReducer } from "../auth/authSlice";

// import other reducers

const rootReducer = combineReducers({
  auth: pocketBaseAuthReducer,
  // projects: projectsReducer,
  // blogs: blogsReducer,
  // theme: themeReducer,
});

// Define the type for your root state based on the root reducer
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
