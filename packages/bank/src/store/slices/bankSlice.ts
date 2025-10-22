import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../host/src/store/store';
import { BanksState } from '../../../../shared-types';


const initialState: BanksState = {
  list: [],
  selectedId: null,
  loading: false,
  error: null,
  bankAccount: []
};

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<any[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectBank(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});

export const { fetchRequest, fetchSuccess, fetchFailure, selectBank } = banksSlice.actions;
export default banksSlice.reducer; // Export reducer để host inject

// Selector example (sử dụng RootState)
export const selectBanksList = (state: RootState) => state.banks?.list;