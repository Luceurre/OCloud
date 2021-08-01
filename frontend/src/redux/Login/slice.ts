import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginState = Readonly<{
  token: string | null;
  isLoggedIn: boolean;
}>;

const initialState: LoginState = { token: null, isLoggedIn: false };

const avatarSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    userLoggedOut: () => initialState,
  },
});

export const { userLoggedIn, userLoggedOut } = avatarSlice.actions;
export default avatarSlice.reducer;
