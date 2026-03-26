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

  const handleBuy = (item: any) => {
    const isBerry = item.category === 'Ягоды';
    dispatch(buyItem({
      name: item.name,
      image: item.image,
      w: isBerry ? 2 : 1,
      h: isBerry ? 2 : 1
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>МАГАЗИН</h1>
      <div style={styles.grid}>
        {items.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <img src={item.image} alt="" style={styles.img} />
            <p>{item.name}</p>
            <p>Размер: {item.category === 'Ягоды' ? '2x2' : '1x1'}</p>
            <button style={styles.btn} onClick={() => handleBuy(item)}>КУПИТЬ (1000)</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' },
  card: { background: '#1e1e1e', padding: '15px', borderRadius: '10px', textAlign: 'center' },
  img: { width: '50px' },
  btn: { background: '#FFCB05', border: 'none', padding: '10px', cursor: 'pointer', marginTop: '10px', width: '100%' }
};

export default Shop;