import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TransactionState,
  Transaction,
  TransferRequest,
  // AuthenticateRequest,
  // CreateTransactionPayload,
  LoginPayload,
} from '../../../../shared-types';

const initialState: TransactionState = {
  isVerified: false,
  loading: false,
  error: null,
  transactions: [],
  currentTransaction: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // create transaction
    createTransactionRequest(state, action: PayloadAction<TransferRequest>) {
      state.loading = true;
    },
    createTransactionSuccess(state, action: PayloadAction<Transaction>) {
      state.loading = false;
      state.currentTransaction = action.payload;
    },
    createTransactionFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    // get transactions
    fetchTransactionsRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.loading = false;
      state.transactions = action.payload;
    },

    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    verifyTransferRequest(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    verifyTransferSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.isVerified = action.payload;
    },
    verifyTransferFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      state.currentTransaction = null;
      state.error = null;
      state.isVerified = false;
      state.loading = false;
    },
  },
});

export const {
  createTransactionRequest,
  createTransactionSuccess,
  createTransactionFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  verifyTransferRequest,
  verifyTransferSuccess,
  verifyTransferFailure,
  resetState,
} = transactionSlice.actions;
export default transactionSlice.reducer;
