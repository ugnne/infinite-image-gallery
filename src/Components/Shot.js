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
      author: this.props.author,
      isVisible: false,
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

    if (elementPosition < windowThreshold) {
      this.setState({
        src: this.state.url,
        isVisible: true,
      })
    }
  }


  componentDidMount() {
    this.lazyLoadImage()

    window.addEventListener('scroll', this.lazyLoadImage);

    this.setState({ favorited: storage.getShots(this.state.id) })
  }

  render() {
    const { favorited, src, isVisible } = this.state
    return (
      <div className="image-wrapper" ref={this.props.id} >
        <img src={this.state.src}
          className="image" alt=""
          onLoad={this.props.handleImageLoaded} />
        {this.props.imageStatus}
        <div className={isVisible ? "image-overlay" : "lazy-overlay"} >
          <div className="text-content-wrapper">
            <div className="title">{this.state.title}</div>
            <div className="author">{this.state.author}</div>
          </div>
          <FavouriteButton id={`"button " + ${this.state.id}`}
            className="favorite-button"
            clicksHandler={this.handleClick}
            value={favorited ? "Unfavourite" : "Favourite"}
          />
        </div>
        <FavouriteIcon clicksHandler={this.handleClick}
          id={`"icon" + ${this.state.id}`}
          iconSrc={favorited ? HeartFilled : HeartEmpty}
          className={favorited && (isVisible) ? "heart-filled" : "heart-empty"}
        />
      </div>
    );
  }
}

export default Shot;


// #QnA noriu, kad vietoje props.handleImageLoaded būtų galima perduoti 
// handleImageLoaded() {
//   this.props.handleImageLoaded
//  this.props.handleImageChange
//  }
//  viena tikrintu ar img yra matomas ir grazintu true arba false, kita pagal tai, ka grazina - pakeistu state’a


// Bandžiau ieškoti visų img elementų su const shotElement  = querySelectorAll(‘img’), bet kai
// prisikiriu  shotElement —> parentNode.querySelectorAll('img’);, meta “parentNode.querySelectorAll(‘img’)” is not a function. Taip pat bandžiau su
// document.querySelectorAll(‘img’)

