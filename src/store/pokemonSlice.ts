import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Pokemon {
  name: string;
  image: string;
  hp: number;
  weight: number; 
}

export const fetchRandomPokemon = createAsyncThunk('pokemon/fetchRandom', async () => {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  return {
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    hp: data.stats[0].base_stat,
    weight: data.weight, 
  };
});
