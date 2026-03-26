import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        <div style={styles.ball}></div>
        <span style={styles.title}>POKEMON <span style={{ color: '#FFCB05' }}>CLICKER</span></span>
      </Link>

      <div style={styles.res}>
        <div style={styles.item}>💰 1,500</div>
        <div style={styles.item}>💎 50</div>
      </div>

      <div style={styles.user}>
        <span style={styles.userName}>Player_1</span>
        <div style={styles.ava}></div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    height: '70px',
    background: '#1e1e1e',
    borderBottom: '3px solid #FFCB05'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: '900'
  },
  ball: {
    width: '25px',
    height: '25px',
    background: 'red',
    borderRadius: '50%',
    border: '2px solid white'
  },
  res: {
    display: 'flex',
    gap: '15px'
  },
  item: {
    background: '#333',
    padding: '6px 14px',
    borderRadius: '15px',
    fontSize: '14px'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  userName: {
    fontSize: '14px'
  },
  ava: {
    width: '35px',
    height: '35px',
    background: '#FFCB05',
    borderRadius: '50%'
  }
};

export default Header;