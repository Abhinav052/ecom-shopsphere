import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import homeReducer from "../features/home/home.slice";
import adminProductReducer from "../features/admin/admin.product.slice";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["adminProduct"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  adminProduct: adminProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
