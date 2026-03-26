import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { moveItem } from '../store/userSlice';

const CELL_SIZE = 60;

const Inventory: React.FC = () => {
  const inventory = useSelector((state: RootState) => state.user.inventory);
  const dispatch = useDispatch();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    dispatch(moveItem({ id, x, y }));
    setDraggingId(null);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={{ color: '#FFCB05', marginBottom: '20px' }}>ИНВЕНТАРЬ (10x8)</h2>
      <div 
        style={styles.grid} 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {Array.from({ length: 10 * 8 }).map((_, i) => (
          <div key={i} style={styles.cell}></div>
        ))}

        {inventory.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item.id)}
            style={{
              ...styles.item,
              width: item.w * CELL_SIZE,
              height: item.h * CELL_SIZE,
              left: item.x * CELL_SIZE,
              top: item.y * CELL_SIZE,
              opacity: draggingId === item.id ? 0.5 : 1
            }}
          >
            <img src={item.image} alt="" style={styles.itemImg} />
            <span style={styles.itemName}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  grid: { 
    width: 600, 
    height: 480, 
    background: '#1a1a1a', 
    position: 'relative', 
    display: 'grid', 
    gridTemplateColumns: 'repeat(10, 60px)', 
    gridTemplateRows: 'repeat(8, 60px)',
    border: '2px solid #444'
  },
  cell: { border: '1px solid #333' },
  item: { 
    position: 'absolute', 
    background: 'rgba(255, 203, 5, 0.1)', 
    border: '2px solid #FFCB05', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    cursor: 'move',
    zIndex: 10,
    boxSizing: 'border-box'
  },
  itemImg: { width: '70%', height: '70%', objectFit: 'contain' },
  itemName: { fontSize: '9px', color: 'white', position: 'absolute', bottom: 2, textAlign: 'center' }
};

export default Inventory;