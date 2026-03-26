import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  money: number;
  inventory: string[];
}

const initialState: UserState = {
  username: null,
  money: 1500,
  inventory: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; money: number; inventory?: string[] }>) => {
      state.username = action.payload.username;
      state.money = action.payload.money;
      state.inventory = action.payload.inventory || [];
    },
    addMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    removeMoney: (state, action: PayloadAction<number>) => {
      state.money -= action.payload;
    },
    buyItem: (state, action: PayloadAction<string>) => {
      if (state.money >= 1000) {
        state.money -= 1000;
        state.inventory.push(action.payload);
      }
    },
    logoutUser: (state) => {
      state.username = null;
      state.money = 1500;
      state.inventory = [];
    }
  },
});

export const { setUser, addMoney, removeMoney, buyItem, logoutUser } = userSlice.actions;
export default userSlice.reducer;