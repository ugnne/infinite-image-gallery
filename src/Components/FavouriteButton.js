import React from 'react';

const FavouriteButton = (props) => {

  const clickHandler = props.clicksHandler
  return (
    <div className="favorite-button-wrapper">
      <button
        onClick={clickHandler}
        className="favorite-button" >
        {props.value}
      </button>
    </div>)
}

export default FavouriteButton
