import React from 'react'

const FavouriteIcon = (props) => {
  return (
    <div className="favorite-icon-wrapper">
      <img id={props.iconId} onClick={props.clicksHandler}
        src={props.iconSrc}
        className={props.className} >
      </img>
    </div>)
}

export default FavouriteIcon
