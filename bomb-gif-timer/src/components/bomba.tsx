import React, { useRef, useState } from 'react';
import './bomba.css';

const DEFAULT_MINUTES = 2;

export const Bomba: React.FC = () => {
  const [minutos, setMinutos] = useState(DEFAULT_MINUTES);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [explodiu, setExplodiu] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const iniciar = () => {
    setExplodiu(false);
    setAtivo(true);
    setTempoRestante(minutos * 60);
    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setExplodiu(true);
          setAtivo(false);
          setTimeout(() => {
            audioRef.current?.play();
          }, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const larguraPavio = ativo
    ? `${(tempoRestante / (minutos * 60)) * 300}px`
    : '300px';

  return (
    <div className="bomba-container">
<h2>Bomba Timer 💣</h2>
<div className="bomba-emoji">{explodiu ? '💥' : '💣'}</div>
<div
        className="pavio"
        style={{
          width: larguraPavio,
          transition: ativo ? `width ${minutos * 60}s linear` : 'none',
          background: explodiu ? 'red' : 'orange',
        }}
      />
      <div className="timer">
        {ativo || explodiu
          ? `${Math.floor(tempoRestante / 60)}:${(tempoRestante % 60)
              .toString()
              .padStart(2, '0')}`
          : '--:--'}
      </div>
      <input
        type="number"
        min={1}
        value={minutos}
        disabled={ativo}
        onChange={e => setMinutos(Number(e.target.value))}
        className="input-minutos"
      />
      <button onClick={iniciar} disabled={ativo} className="btn-iniciar">
        Iniciar
      </button>
      <audio ref={audioRef} src="/explosion.mp3" />
    </div>
  );
};

export default Bomba;