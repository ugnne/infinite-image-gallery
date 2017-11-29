import React from 'react';
import ReactDOM from 'react-dom'
import FavouriteButton from './FavouriteButton';
import FavouriteIcon from './FavouriteIcon';
import storage from './LocalStorage'
import { Dummy, HeartEmpty, HeartFilled } from '../images';

class Shot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      favorited: false,
      src: Dummy,
      url: this.props.url,
      title: this.props.title,
      author: this.props.author
    }

    this.lazyLoadImage = this.lazyLoadImage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleFavorites = this.toggleFavorites.bind(this)
  }

  handleClick() {
    this.toggleFavorites();
  }

  updateStorage() {
    if (this.state.favorited) {
      storage.add(this.state.id, this.state.favorited)
    } else {
      storage.remove(this.state.id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favorited !== this.state.favorited) this.updateStorage()
  }

  toggleFavorites() {
    this.setState({ favorited: !this.state.favorited })
  }

  lazyLoadImage() {
    let element = ReactDOM.findDOMNode(this.refs[this.state.id])
    let elementPosition = element.getBoundingClientRect().y
    let windowThreshold = window.innerHeight * 1.1

    if (elementPosition < windowThreshold) this.setState({ src: this.state.url })
  }

  componentDidMount() {
    this.lazyLoadImage()

    window.addEventListener('scroll', this.lazyLoadImage);

    this.setState({ favorited: storage.getShots(this.state.id) })
  }

  render() {
    const { favorited } = this.state
    return (
      <div className="image-wrapper mobile-visible" ref={this.props.id} >
        <img src={this.state.src} className="image" alt="" />
        <div className="image-overlay">
          <div className="text-content-wrapper">
            <div className="title">{this.state.title}</div>
            <div className="author">{this.state.author}</div>
          </div>
          <FavouriteButton id={`"button " + ${this.state.id}`}
            className="favorite-button"
            clicksHandler={this.handleClick}
            value={this.state.favorited ? "Unfavourite" : "Favourite"}
          />
        </div>
        <FavouriteIcon clicksHandler={this.handleClick}
          id={`"icon" + ${this.state.id}`}
          iconSrc={this.state.favorited ? HeartFilled : HeartEmpty}
          className={this.state.favorited ? "heart-filled" : "heart-empty"}
        />
      </div>
    );
  }
}

export default Shot;


