import React from "react";

const FavouriteButton = props => {
  return (
    <div className="favorite-button-wrapper">
      <button className="favorite-button">{props.value}</button>
    </div>
  );
};

export default FavouriteButton;
