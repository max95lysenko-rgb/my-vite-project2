import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  money: number;
}

const initialState: UserState = {
  username: null,
  money: 1500,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; money: number }>) => {
      state.username = action.payload.username;
      state.money = action.payload.money;
    },
    addMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    logoutUser: (state) => {
      state.username = null;
      state.money = 1500;
    }
  },
});

export const { setUser, addMoney, logoutUser } = userSlice.actions;
export default userSlice.reducer;