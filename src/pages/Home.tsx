import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.hp}>HP: 100 / 100</div>
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
          alt="poke" 
          style={styles.img}
        />
        <h2 style={styles.name}>PIKACHU</h2>
        <button style={styles.btn}>ATTACK</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '60px'
  },
  card: {
    textAlign: 'center',
    background: '#1e1e1e',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid #333'
  },
  hp: {
    fontSize: '14px',
    color: '#aaa',
    marginBottom: '20px'
  },
  img: {
    width: '220px',
    cursor: 'pointer'
  },
  name: {
    fontSize: '28px',
    margin: '20px 0',
    letterSpacing: '2px'
  },
  btn: {
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

export default Home;