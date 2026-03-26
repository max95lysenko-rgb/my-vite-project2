import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  money: number;
}

const initialState: UserState = {
  money: 1500,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    removeMoney: (state, action: PayloadAction<number>) => {
      state.money -= action.payload;
    },
  },
});

export const { addMoney, removeMoney } = userSlice.actions;
export default userSlice.reducer;