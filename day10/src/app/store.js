import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserApi } from '../services/UserApi'
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {

    [UserApi.reducerPath]: UserApi.reducer,
    auth:authReducer,
    user:userReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
})


setupListeners(store.dispatch)