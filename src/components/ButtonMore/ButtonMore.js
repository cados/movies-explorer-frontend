import React from 'react';
import './ButtonMore.css';

function ButtonMore(props) {
  return (
    <div className="container">
      <button className="button_more" type="button" onClick={props.onClick}>Ещё</button>
    </div>

  );
}

export default ButtonMore;
