import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { addMoney, removeMoney } from "../store/userSlice";

const Header: React.FC = () => {
  const money = useSelector((state: RootState) => state.user.money);
  const dispatch = useDispatch();

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        <div style={styles.ball}></div>
        <span>POKEMON CLICKER</span>
      </Link>

      <div style={styles.res}>
        <button onClick={() => dispatch(removeMoney(10))} style={styles.btn}>
          -
        </button>
        <div style={styles.item}>💰 {money}</div>
        <button onClick={() => dispatch(addMoney(10))} style={styles.btn}>
          +
        </button>
      </div>

      <div style={styles.user}>
        <span>Player_1</span>
        <div style={styles.ava}></div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    height: "70px",
    background: "#1e1e1e",
    borderBottom: "3px solid #FFCB05",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    fontWeight: "900",
  },
  ball: {
    width: "25px",
    height: "25px",
    background: "red",
    borderRadius: "50%",
    border: "2px solid white",
  },
  res: { display: "flex", gap: "15px", alignItems: "center" },
  item: {
    background: "#333",
    padding: "6px 14px",
    borderRadius: "15px",
    fontSize: "14px",
    minWidth: "80px",
    textAlign: "center",
  },
  btn: {
    background: "#FFCB05",
    border: "none",
    borderRadius: "4px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  user: { display: "flex", alignItems: "center", gap: "10px" },
  ava: {
    width: "35px",
    height: "35px",
    background: "#FFCB05",
    borderRadius: "50%",
  },
};

export default Header;
