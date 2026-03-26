import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { logoutUser } from '../store/userSlice';
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
      <div style={styles.logo}>POKEMON CLICKER</div>
      
      {username && (
        <div style={styles.info}>
          <div style={styles.stat}>💰 {money}</div>
          <div style={styles.stat}>🎒 {collection.length} pokes</div>
          <div style={styles.user} onClick={handleLogout} title="Выйти">
            {username} (Выход)
          </div>
        </div>
      )}
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', padding: '0 20px', height: '60px', alignItems: 'center', background: '#1e1e1e', borderBottom: '2px solid #FFCB05' },
  logo: { fontWeight: 'bold', color: '#FFCB05' },
  info: { display: 'flex', gap: '20px', alignItems: 'center' },
  stat: { fontSize: '14px' },
  user: { cursor: 'pointer', color: '#aaa', fontSize: '14px', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px' }
};

export default Header;