import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchRandomPokemon } from '../store/pokemonSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    if (!data) {
      dispatch(fetchRandomPokemon());
    }
  }, [dispatch, data]);

  return (
    <div style={styles.container}>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : data ? (
        <div style={styles.card}>
          <div style={styles.hp}>HP: {data.hp} / {data.hp}</div>
          <img src={data.image} alt={data.name} style={styles.img} />
          <h2 style={styles.name}>{data.name.toUpperCase()}</h2>
          <button 
            style={styles.btn} 
            onClick={() => dispatch(fetchRandomPokemon())}
          >
            СЛЕДУЮЩИЙ ПОКЕМОН
          </button>
        </div>
      ) : null}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', justifyContent: 'center', paddingTop: '60px' },
  card: { textAlign: 'center', background: '#1e1e1e', padding: '40px', borderRadius: '20px', border: '1px solid #333', width: '300px' },
  hp: { fontSize: '14px', color: '#aaa', marginBottom: '20px' },
  img: { width: '200px', height: '200px', objectFit: 'contain' },
  name: { fontSize: '24px', margin: '20px 0', color: '#FFCB05' },
  btn: { width: '100%', padding: '12px', background: '#FFCB05', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: '#000' }
};

export default Home;