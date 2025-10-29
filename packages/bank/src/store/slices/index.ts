// bank/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import transferReducer from './transferSlice';
import transactionReducer from './transactionSlice';

export const bankReducer = combineReducers({
  account: accountReducer,
  transfer: transferReducer,
  transaction: transactionReducer
});
