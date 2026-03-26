import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    money: 1500,
  },
  reducers: {
    addMoney: (state, action) => {
      state.money += action.payload;
    },
    removeMoney: (state, action) => {
      state.money -= action.payload;
    },
  },
});

export const { addMoney, removeMoney } = userSlice.actions;
export default userSlice.reducer;