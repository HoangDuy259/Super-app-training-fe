import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../host/src/store/store';
import { BankAccount, BankState, Transaction } from '../../../../shared-types';


const initialState: BankState = {
  accounts: [],
  transactions: [],
  loading: false,
  error: null,
  selectedId: null,
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    selectBank(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },

    // accounts
    getAccountRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    getAccountSuccess(state, action: PayloadAction<BankAccount[]>){
      state.accounts = action.payload;
      state.loading = false;
    },

    getAccountFailure(state, action: PayloadAction<string>){
      state.error = action.payload;
      state.loading = false;
    },
    
    // transaction
    getTransactionRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    
    getTransactionSuccess(state, action: PayloadAction<Transaction[]>){
      state.transactions = action.payload;
      state.loading = false;
    },

    getTransactionFailure(state, action: PayloadAction<string>){
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { selectBank } = bankSlice.actions;
export const { getAccountRequest, getAccountSuccess, getAccountFailure, getTransactionRequest, getTransactionSuccess, getTransactionFailure } = bankSlice.actions;
export default bankSlice.reducer; // Export reducer để host inject

// Selector example (sử dụng RootState)