import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransferState, BankAccount } from '../../../../shared-types';

const initialState: TransferState = {
  // selectedAccount: null,
  destinationAccount: null,
  amount: 0,
  note: '',
  loading: false,
  error: null,
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    // select account
    // selectAccount(state, action: PayloadAction<BankAccount>) {
    //   state.selectedAccount = action.payload;
    // },

    selectDestinationAccount(state, action: PayloadAction<BankAccount>) {
      state.destinationAccount = action.payload;
    },

    clearDestinationAccount(state) {
      state.destinationAccount = null;
    },

    // edit note and amount
    changeNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
    },

    changeAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload
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
  selectDestinationAccount,
  changeAmount,
  changeNote,
  findDestinationAccountRequest,
  findDestinationAccountSuccess,
  findDestinationAccountFailure,
  clearDestinationAccount
} = transferSlice.actions;
export default transferSlice.reducer;
