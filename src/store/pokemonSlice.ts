import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomPokemon = createAsyncThunk(
  'pokemon/fetchRandom',
  async () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    return {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      hp: data.stats[0].base_stat,
    };
  }
);

interface PokemonState {
  data: any | null;
  loading: boolean;
}

const initialState: PokemonState = {
  data: null,
  loading: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRandomPokemon.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default pokemonSlice.reducer;