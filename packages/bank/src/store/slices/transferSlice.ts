import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransferState, BankAccount } from '../../../../shared-types';

const initialState: TransferState = {
  selectedAccount: null,
  destinationAccount: null,
  loading: false,
  error: null,
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    selectAccount(state, action: PayloadAction<BankAccount>) {
      state.selectedAccount = action.payload;
    },

    selectDestinationAccount(state, action: PayloadAction<BankAccount>) {
      state.destinationAccount = action.payload;
    },

    // find beneficiary account
    findDestinationAccountRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    findDestinationAccountSuccess(state, action: PayloadAction<BankAccount>) {
      state.loading = false;
      state.destinationAccount = action.payload;
    },

    findDestinationAccountFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  selectAccount,
  selectDestinationAccount,
  findDestinationAccountRequest,
  findDestinationAccountSuccess,
  findDestinationAccountFailure,
} = transferSlice.actions;
export default transferSlice.reducer;
