// bank/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import transferReducer from './transferSlice';

export const bankReducer = combineReducers({
  account: accountReducer,
  transfer: transferReducer,
});
