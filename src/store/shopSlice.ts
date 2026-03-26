import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ShopItem {
  name: string;
  image: string;
  category: string;
}

export const fetchShopItems = createAsyncThunk('shop/fetchItems', async () => {
  const ballRes = await fetch('https://pokeapi.co/api/v2/item-category/34/');
  const ballData = await ballRes.json();
  
  const berryRes = await fetch('https://pokeapi.co/api/v2/item-category/3/');
  const berryData = await berryRes.json();

  const processItems = (items: any[], cat: string) => items.slice(0, 8).map((i: any) => ({
    name: i.name,
    category: cat,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${i.name}.png`
  }));

  return [...processItems(ballData.items, 'Покеболлы'), ...processItems(berryData.items, 'Ягоды')];
});

interface ShopState {
  items: ShopItem[];
  loading: boolean;
}

const initialState: ShopState = {
  items: [],
  loading: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => { state.loading = true; })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default shopSlice.reducer;