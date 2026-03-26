import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import pokemonReducer from './pokemonSlice';
import shopReducer from './shopSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pokemon: pokemonReducer,
    shop: shopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;