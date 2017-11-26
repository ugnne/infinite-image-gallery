import React from 'react'

const FavouriteIcon = (props) => {
  return (
    <div className="favorite-icon-wrapper">
      <img className="heart" id={props.iconId} onClick={props.clicksHandler}
        src={props.iconSrc} >
      </img>
    </div>)
}

export default FavouriteIcon
