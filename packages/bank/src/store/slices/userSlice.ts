import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangePasswordRequest, UserUI } from '../../../../shared-types';

const initialState: UserUI = {
  loading: false,
  error: null,
  isVerified: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // user
    changePasswordRequest(state, action: PayloadAction<ChangePasswordRequest>) {
      state.loading = true;
    },

    changePasswordSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
    },

    changePasswordFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = userSlice.actions;
export default userSlice.reducer;
