import React from 'react';
import storage from './LocalStorage'

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      favorited: false,
  }
    this.handleClick = this.handleClick.bind(this)
    this.toggleFavorites = this.toggleFavorites.bind(this)
  }

  handleClick() {
    this.toggleFavorites();
    this.props.clicksHandler()
  }

  toggleFavorites() {
    this.state.favorited = !this.state.favorited
    this.setState({
      favorited: this.state.favorited
    })
    if (this.state.favorited) {
      storage.add(this.state.id, this.state.favorited)
    } else {
      storage.remove(this.state.id)
    }
  }

  componentDidMount() {
    this.setState({
      favorited: storage.getShots(this.state.id)
    })
  }

  render() {
    const clickHandler =  this.handleClick
    return (
      <div className="favorite-button-wrapper">
        <button className="favorite-button" onClick={clickHandler} id={this.state.id}>
          {this.state.favorited ? "Unfavourite" : "Favourite"}
        </button>
      </div>
    );
  }
}

export default Button;
