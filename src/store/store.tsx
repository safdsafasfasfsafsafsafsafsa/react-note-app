import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/mainSilce";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    modal: modalReducer,
  },
});

// `RootState`와 `AppDispatch` 타입을 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
