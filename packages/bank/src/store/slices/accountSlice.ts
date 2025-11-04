import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountUIState, BankAccount, HandleStatusRequest } from '../../../../shared-types';

const initialState: AccountUIState = {
  currentAccount: null,
  accounts: [],
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
    handleAccountStatusRequest(state, action: PayloadAction<HandleStatusRequest>) {
      state.loading = true;
    },

    handleAccountStatusSuccess(state, action: PayloadAction<BankAccount>) {
      state.currentAccount = action.payload;
      state.loading = false;
    },

    handleAccountStatusFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getAccountRequest, getAccountSuccess, getAccountFailure, selectAccount, handleAccountStatusRequest, handleAccountStatusSuccess, handleAccountStatusFailure } =
  accountSlice.actions;
export default accountSlice.reducer;
