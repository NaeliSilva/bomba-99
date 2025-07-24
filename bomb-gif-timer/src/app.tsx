import React, { useState, useEffect } from 'react';

export default function App() {
  const [tempo, setTempo] = useState(10);
  const [explodiu, setExplodiu] = useState(false);

  useEffect(() => {
    if (tempo > 0) {
      const timer = setTimeout(() => setTempo(tempo - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExplodiu(true);
    }
  }, [tempo]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>💣 Bomba!</h1>
      <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Bomba" />
      {!explodiu ? (
        <h2>Tempo restante: {tempo} segundos</h2>
      ) : (
        <h2 style={{ color: 'red' }}>💥 Explodiu!</h2>
      )}
    </div>
  );
}