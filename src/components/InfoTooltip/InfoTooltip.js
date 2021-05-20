import React from 'react';
import './InfoTooltip.css';
import success from '../../images/success.svg';
import fail from '../../images/fail.svg';

function InfoTooltip(props) {
  return (
    <div className={`infotooltip ${props.isOpen && 'infotooltip_opened'}`} id={props.name}>
      <div onClick={props.onClose} className="infotooltip__overlay"></div>
      <div className="infotooltip__container">
        <button onClick={props.onClose} className="infotooltip__close" type="button" />
        <img className="infotooltip__image"
          src={props.infoContent.status ? success : fail}
          alt="Изображение"
        />
        <h2 className="infotooltip__text">{props.infoContent.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
