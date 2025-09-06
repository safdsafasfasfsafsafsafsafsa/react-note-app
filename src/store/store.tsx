import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/mainSilce";
import modalReducer from "./slices/modalSlice";
import sortReducer from "./slices/sortSlice";
import noteUpdateReducer from "./slices/noteUpdateSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    modal: modalReducer,
    sort: sortReducer,
    noteUpdate: noteUpdateReducer,
  },
});

// `RootState`와 `AppDispatch` 타입을 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
