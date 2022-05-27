import React from 'react';
import './ButtonMore.css';

function ButtonMore({ onClick }) {
  return (
    <div className="container">
      <button className="button_more" type="button" onClick={onClick}>Ещё</button>
    </div>

  );
}

export default ButtonMore;
