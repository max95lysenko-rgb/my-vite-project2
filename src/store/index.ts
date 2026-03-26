import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import pokemonReducer from './pokemonSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;