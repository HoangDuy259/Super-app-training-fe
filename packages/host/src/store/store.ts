import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from '../saga/auth/authSlice';

import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Chạy saga
sagaMiddleware.run(rootSaga);

// Types cho toàn bộ app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
