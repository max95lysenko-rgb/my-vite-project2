import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMoney } from './store/userSlice';
import type { RootState, AppDispatch } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, money } = useSelector((state: RootState) => state.user);
  const { activePokemon, collection } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {