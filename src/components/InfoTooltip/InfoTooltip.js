import React from 'react';
import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
    <div className={`infotooltip ${props.isOpen && 'infotooltip_opened'}`} id={props.name}>
      <div onClick={props.onClose} className="infotooltip__overlay"></div>
      <div className="infotooltip__container">
        <button onClick={props.onClose} className="infotooltip__close" type="button" />
        <h2 className="infotooltip__text">Error: {props.errorMessage}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
