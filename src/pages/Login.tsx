import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import { setCollection, addPokemonToCollection } from '../store/pokemonSlice';
import { getUserData, saveUserData } from '../utils/storage';
import { AppDispatch } from '../store';

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
      };

      userData = { money: 1500, pokemons: [firstPokemon] };
      saveUserData(name, userData.money, userData.pokemons);
      alert('Регистрация успешна! Вам подарен первый покемон.');
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
        <h2>Вход в Pokemon Clicker</h2>
        <input 
          style={styles.input}
          placeholder="Введите имя..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAuth} style={styles.btn}>ИГРАТЬ</button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
  card: { background: '#1e1e1e', padding: '40px', borderRadius: '15px', textAlign: 'center' as const, border: '1px solid #333' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white', marginBottom: '15px', width: '200px' },
  btn: { display: 'block', width: '100%', padding: '10px', background: '#FFCB05', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
};

export default Login;