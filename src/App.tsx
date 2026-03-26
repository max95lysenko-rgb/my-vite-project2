import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addMoney } from './store/userSlice';
import { saveUserData } from './utils/storage';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, money, inventory } = useSelector((state: RootState) => state.user);
  const { activePokemon, collection } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    const timer = setInterval(() => {
      if (username) {
        const currentPoke = activePokemon || collection[0];
        if (currentPoke && currentPoke.weight) {
          const income = Math.max(1, Math.floor(currentPoke.weight / 10));
          dispatch(addMoney(income));
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, username, activePokemon, collection]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (username) {
        saveUserData(username, money, collection);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [username, money, collection]);

  return (
    <Router>
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;