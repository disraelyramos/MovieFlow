import React from 'react';

const API_BASE = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3001';

const absUrl = (u) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  return `${API_BASE}${u.startsWith('/') ? '' : '/'}${u}`;
};

export default function HoraChip({
  start,      // 'HH:MM'
  end,        // 'HH:MM'
  overnight,  // boolean
  title,
  formato,    // '2D' | '3D' | 'IMAX' ...
  price,      // number
  poster,     // '/uploads/...'
  onClick
}) {
  const img = absUrl(poster);

  return (
    <button type="button" className="hora-chip shadow-sm" onClick={onClick}>
      {img ? (
        <img className="hora-chip__poster" src={img} alt={title} />
      ) : (
        <div className="hora-chip__poster placeholder" />
      )}

      <div className="hora-chip__content">
        <div className="hora-chip__time">
          <i className="bi bi-clock me-1" />
          <span>{start} — {end}{overnight ? ' (+1)' : ''}</span>
        </div>

        <div className="hora-chip__title" title={title}>{title || 'Función'}</div>

        <div className="hora-chip__meta">
          {formato && <span className="badge bg-light text-dark me-2">{formato}</span>}
          <span className="hora-chip__price">Q {Number(price || 0).toFixed(2)}</span>
        </div>
      </div>
    </button>
  );
}

