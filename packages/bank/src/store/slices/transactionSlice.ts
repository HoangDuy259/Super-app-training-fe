import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionState, Transaction, TransferRequest, AuthenticateRequest, CreateTransactionPayload } from '../../../../shared-types';

const initialState: TransactionState = {
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
    createTransactionRequest(state, action: PayloadAction<CreateTransactionPayload>) {
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

    // authenticate
    // authenticateTransferRequest(state, action: PayloadAction<CreateTransactionPayload>){
    //   state.loading = true;
    // }
  },
});

export const {
  createTransactionRequest,
  createTransactionSuccess,
  createTransactionFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  // authenticateTransferRequest
} = transactionSlice.actions;
export default transactionSlice.reducer;
