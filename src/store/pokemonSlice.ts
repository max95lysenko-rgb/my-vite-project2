import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Pokemon {
  name: string;
  image: string;
  hp: number;
}

export const fetchRandomPokemon = createAsyncThunk('pokemon/fetchRandom', async () => {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  return {
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    hp: data.stats[0].base_stat,
  };
});

interface PokemonState {
  activePokemon: Pokemon | null;
  collection: Pokemon[]; 
  loading: boolean;
}

const initialState: PokemonState = {
  activePokemon: null,
  collection: [],
  loading: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<Pokemon[]>) => {
      state.collection = action.payload;
    },
    addPokemonToCollection: (state, action: PayloadAction<Pokemon>) => {
      state.collection.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomPokemon.pending, (state) => { state.loading = true; })
      .addCase(fetchRandomPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.activePokemon = action.payload;
      });
  },
});

export const { setCollection, addPokemonToCollection } = pokemonSlice.actions;
export default pokemonSlice.reducer;