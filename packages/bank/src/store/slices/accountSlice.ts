import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AccountUIState,
  BankAccount,
  HandleStatusRequest,
} from '../../../../shared-types';

const initialState: AccountUIState = {
  currentAccount: null,
  accounts: [],
  suggestions: [],
  similar: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // accounts
    getAccountRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    getAccountSuccess(state, action: PayloadAction<BankAccount[]>) {
      state.accounts = action.payload;
      state.loading = false;
    },

    getAccountFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    // current account
    selectAccount(state, action: PayloadAction<BankAccount>) {
      state.currentAccount = action.payload;
    },
    // handle status accounts
    handleAccountStatusRequest(
      state,
      action: PayloadAction<HandleStatusRequest>,
    ) {
      state.loading = true;
    },

    handleAccountStatusSuccess(state, action: PayloadAction<BankAccount>) {
      const updatedAccount = action.payload;
      state.currentAccount = updatedAccount;
      state.loading = false;
      state.accounts = state.accounts.map(acc =>
        acc.id === updatedAccount.id ? updatedAccount : acc,
      );
    },

    handleAccountStatusFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    createFirstAccountRequest(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    createFirstAccountSuccess(state, action: PayloadAction<BankAccount>) {
      state.loading = false;
      state.currentAccount = action.payload;
    },

    createFirstAccountFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error;
    },

    searchAccountRequest: (state, action: PayloadAction<{ q: string; type: 'startsWith' | 'contains' }>) => {
      state.loading = true;
      state.error = null;
    },
    suggestAccountRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    searchAccountSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.similar = action.payload;
    },
    suggestAccountSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.suggestions = action.payload;
    },

    searchAccountFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAccountRequest,
  getAccountSuccess,
  getAccountFailure,
  selectAccount,
  handleAccountStatusRequest,
  handleAccountStatusSuccess,
  handleAccountStatusFailure,
  createFirstAccountRequest,
  createFirstAccountSuccess,
  createFirstAccountFailure,
  searchAccountRequest,
  suggestAccountRequest,
  searchAccountSuccess,
  suggestAccountSuccess,
  searchAccountFailure,
} = accountSlice.actions;
export default accountSlice.reducer;
