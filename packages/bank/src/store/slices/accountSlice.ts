import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountUIState, BankAccount } from '../../../../shared-types';

const initialState: AccountUIState = {
  accounts: [],
  loading: false,
  error: null
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
  },
});

export const {
  getAccountRequest,
  getAccountSuccess,
  getAccountFailure,
} = accountSlice.actions;
export default accountSlice.reducer;
