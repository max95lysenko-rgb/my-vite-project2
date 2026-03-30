import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

const SHOP = [
  {
    id: "1",
    name: "Poke-ball",
    price: 10,
    b: 1,
    t: "click",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  },
  {
    id: "2",
    name: "Great-ball",
    price: 100,
    b: 10,
    t: "click",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
  },
  {
    id: "3",
    name: "Ultra-ball",
    price: 500,
    b: 5,
    t: "auto",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
  },
  {
    id: "4",
    name: "Master-ball",
    price: 2500,
    b: 50,
    t: "auto",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
  },
  {
    id: "5",
    name: "Rare Candy",
    price: 15000,
    b: 200,
    t: "click",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png",
  },
];

const EVOS = [
  {
    n: "Pichu",
    m: 0,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png",
    c: "#ffef42",
  },
  {
    n: "Pikachu",
    m: 150,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    c: "#ffe100",
  },
  {
    n: "Raichu",
    m: 1000,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    c: "#ffa500",
  },
  {
    n: "Lucario",
    m: 5000,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
    c: "#70d6ff",
  },
  {
    n: "Gengar",
    m: 20000,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    c: "#a855f7",
  },
  {
    n: "Rayquaza",
    m: 100000,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
    c: "#22c55e",
  },
  {
    n: "Arceus",
    m: 1000000,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
    c: "#f8fafc",
  },
];

function App() {
  const [money, setMoney] = useState(
    () => Number(localStorage.getItem("m")) || 0,
  );
  const [total, setTotal] = useState(
    () => Number(localStorage.getItem("t")) || 0,
  );
  const [ups, setUps] = useState(() =>
    JSON.parse(localStorage.getItem("u") || '{"p":0,"a":0}'),
  );
  const [slots, setSlots] = useState<(any | null)[]>(
    () =>
      JSON.parse(localStorage.getItem("s") || "null") || Array(12).fill(null),
  );

  // Новые состояния
  const [combo, setCombo] = useState(0);
  const [megaEnergy, setMegaEnergy] = useState(0);
  const [isMega, setIsMega] = useState(false);
  const [floats, setFloats] = useState<
    { id: number; x: number; y: number; v: number; s: boolean }[]
  >([]);
  const [drag, setDrag] = useState<number | null>(null);

  const bonus = useMemo(() => {
    let c = 0,
      a = 0;
    slots.forEach((s) => {
      if (s) {
        if (s.t === "click") c += s.b;
        if (s.t === "auto") a += s.b;
      }
    });
    return { c, a };
  }, [slots]);

  // Множители
  const comboMult = combo > 50 ? 3 : combo > 20 ? 2 : 1;
  const pwr = (1 + ups.p + bonus.c) * comboMult * (isMega ? 10 : 1);
  const auto = ups.a + bonus.a;

  const costP = Math.floor(20 * Math.pow(1.6, ups.p));
  const costA = Math.floor(50 * Math.pow(1.6, ups.a));
  const evo = [...EVOS].reverse().find((e) => total >= e.m) || EVOS[0];
  const next = EVOS.find((e) => e.m > total);

  // Основной цикл
  useEffect(() => {
    const timer = setInterval(() => {
      if (auto > 0) setMoney((m) => m + auto);
      // Сброс комбо со временем
      setCombo((c) => Math.max(0, c - 2));
    }, 1000);
    return () => clearInterval(timer);
  }, [auto]);

  // Таймер Мега-режима
  useEffect(() => {
    if (isMega) {
      const t = setTimeout(() => {
        setIsMega(false);
        setMegaEnergy(0);
      }, 10000);
      return () => clearTimeout(t);
    }
  }, [isMega]);

  useEffect(() => {
    localStorage.setItem("m", money.toString());
    localStorage.setItem("t", total.toString());
    localStorage.setItem("u", JSON.stringify(ups));
    localStorage.setItem("s", JSON.stringify(slots));
  }, [money, total, ups, slots]);

  const click = (e: React.MouseEvent) => {
    setMoney((m) => m + pwr);
    setTotal((t) => t + 1);
    setCombo((c) => Math.min(100, c + 5));
    if (!isMega) setMegaEnergy((me) => Math.min(100, me + 1));

    const id = Date.now();
    setFloats((f) => [
      ...f,
      { id, x: e.clientX, y: e.clientY, v: pwr, s: isMega },
    ]);
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 700);
  };

  const buy = (i: any) => {
    const idx = slots.findIndex((s) => s === null);
    if (money >= i.price && idx !== -1) {
      setMoney((m) => m - i.price);
      const n = [...slots];
      n[idx] = { ...i, uid: Math.random() };
      setSlots(n);
    }
  };

  return (
    <div
      className={`app ${isMega ? "mega-mode" : ""}`}
      style={{ "--c": evo.c } as any}
    >
      {floats.map((f) => (
        <div
          key={f.id}
          className={`fl ${f.s ? "mega-f" : ""}`}
          style={{ left: f.x, top: f.y }}
        >
          +{f.v.toLocaleString()}
        </div>
      ))}

      <div className="header">
        <div className="mon">💰 {money.toLocaleString()}</div>
        <div className="sts">
          <div className="bd">
            POWER: {pwr} {comboMult > 1 && `(x${comboMult})`}
          </div>
          <div className="bd">AUTO: {auto}/s</div>
          <div className="bd mega-bar-ui">
            ENERGY: {megaEnergy}%
            <div
              className="mega-fill"
              style={{ width: `${megaEnergy}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="side">
          <div className="box">
            <div className="lab">POKE-MART</div>
            <div className="scr">
              {SHOP.map((i) => (
                <div
                  key={i.id}
                  className={`card ${money >= i.price ? "can" : ""}`}
                >
                  <img src={i.img} alt="" />
                  <div className="inf">
                    <div className="nm">{i.name}</div>
                    <div className="bn">
                      +{i.b} {i.t}
                    </div>
                  </div>
                  <button
                    className={money < i.price ? "btn off" : "btn"}
                    onClick={() => buy(i)}
                  >
                    ${i.price}
                  </button>
                </div>
              ))}
            </div>
            <div className="lab mt">TRAINING</div>
            <button
              className={money < costP ? "btn f off" : "btn f"}
              onClick={() =>
                money >= costP &&
                (setMoney(money - costP), setUps({ ...ups, p: ups.p + 1 }))
              }
            >
              Train Pwr (${costP})
            </button>
            <button
              className={money < costA ? "btn f off" : "btn f"}
              onClick={() =>
                money >= costA &&
                (setMoney(money - costA), setUps({ ...ups, a: ups.a + 1 }))
              }
            >
              Auto-Bot (${costA})
            </button>
          </div>
        </div>

        <div className="mid">
          <h2 className="enm">{isMega ? `MEGA ${evo.n}` : evo.n}</h2>
          <div className="p-bg">
            <div
              className="p-f"
              style={{
                width: `${next ? ((total - evo.m) / (next.m - evo.m)) * 100 : 100}%`,
              }}
            ></div>
          </div>

          <div className="combo-ui">
            {combo > 10 && (
              <div className="combo-badge">COMBO x{comboMult}</div>
            )}
            <div className="combo-line" style={{ width: `${combo}%` }}></div>
          </div>

          <div className="p-w">
            <img
              src={evo.img}
              className={`p-i ${isMega ? "mega-img" : ""}`}
              onMouseDown={click}
              alt=""
            />
            {megaEnergy >= 100 && !isMega && (
              <button className="mega-btn" onClick={() => setIsMega(true)}>
                EVOLVE MEGA
              </button>
            )}
          </div>
          <div className="tot">Total Clicks: {total.toLocaleString()}</div>
          <button
            className="rst"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            RESET
          </button>
        </div>

        <div className="side">
          <div className="box backpack">
            <div className="lab">BACKPACK</div>
            <div className="grid">
              {slots.map((s, i) => (
                <div
                  key={i}
                  className="sl"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (drag === null) return;
                    const n = [...slots];
                    [n[i], n[drag]] = [n[drag], n[i]];
                    setSlots(n);
                    setDrag(null);
                  }}
                >
                  {s && (
                    <img
                      src={s.img}
                      className="img"
                      draggable
                      onDragStart={() => setDrag(i)}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
