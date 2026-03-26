import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface InventoryItem {
  id: string;
  name: string;
  image: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface UserState {
  username: string | null;
  money: number;
  inventory: InventoryItem[];
}

const initialState: UserState = {
  username: null,
  money: 5000,
  inventory: [],
};

const GRID_W = 10;
const GRID_H = 8;

const isAreaFree = (items: InventoryItem[], x: number, y: number, w: number, h: number, excludeId?: string) => {
  if (x < 0 || y < 0 || x + w > GRID_W || y + h > GRID_H) return false;
  for (const item of items) {
    if (item.id === excludeId) continue;
    if (x < item.x + item.w && x + w > item.x && y < item.y + item.h && y + h > item.y) {
      return false;
    }
  }
  return true;
};

const findFreeSpot = (items: InventoryItem[], w: number, h: number) => {
  for (let y = 0; y <= GRID_H - h; y++) {
    for (let x = 0; x <= GRID_W - w; x++) {
      if (isAreaFree(items, x, y, w, h)) return { x, y };
    }
  }
  return null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; money: number; inventory?: InventoryItem[] }>) => {
      state.username = action.payload.username;
      state.money = action.payload.money;
      state.inventory = action.payload.inventory || [];
    },
    addMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    buyItem: (state, action: PayloadAction<{ name: string; image: string; w: number; h: number }>) => {
      if (state.money >= 1000) {
        const spot = findFreeSpot(state.inventory, action.payload.w, action.payload.h);
        if (spot) {
          state.money -= 1000;
          state.inventory.push({
            id: Math.random().toString(36).substr(2, 9),
            ...action.payload,
            ...spot
          });
        } else {
          alert("Нет места в инвентаре!");
        }
      }
    },
    moveItem: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const item = state.inventory.find(i => i.id === action.id);
      if (item && isAreaFree(state.inventory, action.x, action.y, item.w, item.h, item.id)) {
        item.x = action.x;
        item.y = action.y;
      }
    },
    logoutUser: (state) => {
      state.username = null;
      state.money = 1500;
      state.inventory = [];
    }
  },
});

export const { setUser, addMoney, buyItem, moveItem, logoutUser } = userSlice.actions;
export default userSlice.reducer;