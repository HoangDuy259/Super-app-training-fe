import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from '../saga/auth/authSlice';

import rootSaga from '../saga/rootSaga';

// slice
import type { AccountUIState, AuthState, BankState, LoginResponse, TransactionState, TransferState} from '../../../shared-types';

export interface RootState {
  auth: LoginResponse & AuthState;
  // bank: BankState;
  accountUI: AccountUIState;
  transferUI: TransferState;
  transactionUI: TransactionState;
}

// generic type cho dynamic reducers
type DynamicReducers = {
  [key: string]: Reducer<any, any>;
};

const staticReducers: DynamicReducers = {
  auth: authReducer,
};
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: combineReducers(staticReducers),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// function để inject dynamic reducer
export function injectReducer(key: string, reducer: Reducer<any, any>) {
  if (staticReducers[key]) return; // Tránh duplicate
  staticReducers[key] = reducer;
  store.replaceReducer(combineReducers(staticReducers));
}

// function để run additional saga
export function runSaga(saga: () => Generator) {
  sagaMiddleware.run(saga);
}

// chạy saga
sagaMiddleware.run(rootSaga);

// Types cho toàn bộ app
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
