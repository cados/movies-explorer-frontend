import React from 'react';
import './MoviesCardList.css';
import classnames from 'classnames';

function MoviesCardList(props) {
  const Component = props.component;
  function countGridElement() {
    let count = 4;
    if (window.innerWidth > 1280) {
      count = 4;
    } else {
      count = Math.floor((window.innerWidth * 0.890625) / 270);
    }
    return count;
  }

  const gridCount = countGridElement();

  const [currentMovieCount, setCurrentMovieCount] = React.useState(
    gridCount * 4 === 4 ? 5 : gridCount * 4,
  );

  function addMovie() {
    setCurrentMovieCount(currentMovieCount + (gridCount === 1 ? 2 : gridCount));
  }

  const buttonClass = classnames({
    movies__addbutton: true,
    movies__addbutton_active: props.movieList.slice(currentMovieCount).length !== 0,
  });

  return (
    <>
      <ul className="movies__card-list">
        {props.movieList.slice(0, currentMovieCount).map((movie, index) => (
          <Component
            data={movie}
            key={index}
          />
        ))}
      </ul>
      <button className={buttonClass} onClick={addMovie}>Ещё</button>
    </>
  );
}

export default MoviesCardList;
