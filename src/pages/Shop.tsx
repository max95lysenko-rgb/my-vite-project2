import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopItems } from '../store/shopSlice';
import { buyItem } from '../store/userSlice';
import type { RootState, AppDispatch } from '../store';

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.shop);
  const money = useSelector((state: RootState) => state.user.money);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchShopItems());
  }, [dispatch, items.length]);

  const handleBuy = (name: string) => {
    if (money >= 1000) {
      dispatch(buyItem(name));
      alert(`Вы купили ${name}!`);
    } else {
      alert('Недостаточно денег!');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>МАГАЗИН ТОВАРОВ</h1>
      {loading ? <h2>Загрузка...</h2> : (
        <div style={styles.grid}>
          {items.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cat}>{item.category}</div>
              <img src={item.image} alt={item.name} style={styles.img} />
              <div style={styles.name}>{item.name.replace('-', ' ')}</div>
              <div style={styles.price}>💰 1000</div>
              <button 
                style={{...styles.btn, opacity: money < 1000 ? 0.5 : 1}} 
                onClick={() => handleBuy(item.name)}
              >
                КУПИТЬ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '40px', color: '#FFCB05' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  card: { background: '#1e1e1e', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #333' },
  cat: { fontSize: '10px', color: '#aaa', textTransform: 'uppercase', marginBottom: '10px' },
  img: { width: '60px', height: '60px', marginBottom: '15px' },
  name: { fontWeight: 'bold', marginBottom: '10px', textTransform: 'capitalize' },
  price: { color: '#FFCB05', fontWeight: 'bold', marginBottom: '15px' },
  btn: { width: '100%', padding: '10px', background: '#FFCB05', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};

export default Shop;