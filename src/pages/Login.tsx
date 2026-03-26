import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isAuth', 'true');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Вход в игру</h2>
        <button onClick={handleLogin} style={styles.btn}>ВОЙТИ</button>
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
  btn: {
    marginTop: '20px',
    padding: '10px 30px',
    background: '#FFCB05',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default Login;