import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { saveUserData } from './utils/storage';

const { username, money } = useSelector((state: RootState) => state.user);
const { collection } = useSelector((state: RootState) => state.pokemon);

useEffect(() => {
  const handleBeforeUnload = () => {
    if (username) {
      saveUserData(username, money, collection);
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [username, money, collection]);