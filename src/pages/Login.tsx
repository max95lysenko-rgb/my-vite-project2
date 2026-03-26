import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import { setCollection } from '../store/pokemonSlice';
import { getUserData, saveUserData } from '../utils/storage';
import type { AppDispatch } from '../store';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!name.trim()) return;

    let userData = getUserData(name);

    if (!userData) {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();
      
      const firstPokemon = {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        hp: data.stats[0].base_stat,
        weight: data.weight,
      };

      userData = { money: 1500, pokemons: [firstPokemon] };
      saveUserData(name, userData.money, userData.pokemons);
    }

    dispatch(setUser({ username: name, money: userData.money }));
    dispatch(setCollection(userData.pokemons));
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('currentUser', name);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Вход в Pokemon Clicker</h2>
        <input 
          style={styles.input}
          placeholder="Введите имя..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAuth} style={styles.btn}>ВОЙТИ</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '80vh' 
  },
  card: { 
    background: '#1e1e1e', 
    padding: '40px', 
    borderRadius: '15px', 
    textAlign: 'center', 
    border: '1px solid #333' 
  },
  title: {
    marginBottom: '25px',
    fontSize: '22px'
  },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #444', 
    background: '#222', 
    color: 'white', 
    marginBottom: '20px', 
    width: '250px',
    outline: 'none'
  },
  btn: { 
    display: 'block', 
    width: '100%', 
    padding: '12px', 
    background: '#FFCB05', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    color: '#000'
  }
};

export default Login;