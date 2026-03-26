import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { addMoney, removeMoney, logoutUser } from '../store/userSlice';
import { saveUserData } from '../utils/storage';

const Header: React.FC = () => {
  const { username, money } = useSelector((state: RootState) => state.user);
  const { collection } = useSelector((state: RootState) => state.pokemon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (username) {
      saveUserData(username, money, collection);
    }
    dispatch(logoutUser());
    localStorage.removeItem('isAuth');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          <div style={styles.ball}></div>
          <span style={styles.title}>POKEMON <span style={{ color: '#FFCB05' }}>CLICKER</span></span>
        </Link>
        
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Главная</Link>
          <Link to="/shop" style={styles.navLink}>Магазин</Link>
        </nav>
      </div>

      {username && (
        <div style={styles.right}>
          <div style={styles.res}>
            <button onClick={() => dispatch(removeMoney(10))} style={styles.ctrlBtn}>-</button>
            <div style={styles.item}>💰 {money}</div>
            <button onClick={() => dispatch(addMoney(10))} style={styles.ctrlBtn}>+</button>
          </div>

          <div style={styles.user} onClick={handleLogout}>
            <span style={styles.userName}>{username}</span>
            <div style={styles.ava}></div>
          </div>
        </div>
      )}
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
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
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
  nav: {
    display: 'flex',
    gap: '20px'
  },
  navLink: {
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: '0.3s'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  res: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  item: {
    background: '#333',
    padding: '6px 14px',
    borderRadius: '15px',
    fontSize: '14px',
    minWidth: '80px',
    textAlign: 'center'
  },
  ctrlBtn: {
    background: '#FFCB05',
    border: 'none',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '8px',
    border: '1px solid transparent'
  },
  userName: {
    fontSize: '14px',
    color: '#FFCB05'
  },
  ava: {
    width: '35px',
    height: '35px',
    background: '#FFCB05',
    borderRadius: '50%'
  }
};

export default Header;