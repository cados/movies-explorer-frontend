import React from 'react';
import './InfoTooltip.css';

function InfoTooltip({
  isOpen, name, onClose, errorMessage,
}) {
  return (
    <div className={`infotooltip ${isOpen && 'infotooltip_opened'}`} id={name}>
      <div onClick={onClose} className="infotooltip__overlay" aria-hidden="true" />
      <div className="infotooltip__container">
        <button onClick={onClose} className="infotooltip__close" type="button" aria-label="Закрыть" />
        <h2 className="infotooltip__text">{errorMessage}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
