import React, { Component } from 'react';
import ShotList from './Components/ShotList';
import api from './Components/Api';
import debounce from './utilities'
import { Spinner } from './images';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: [],
      count: 0,
      pageNumber: 0,
      isLoading: true,
      imageStatus: 'Loading',
    }

    this.handleScroll = this.handleScroll.bind(this)
    // this.addShots = this.addShots.bind(this)
    // this.onAllShotsLoaded = this.onAllShotsLoaded.bind(this)
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  componentDidMount() {
    api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
    console.log("component just mounted")
    window.addEventListener('scroll', debounce(this.handleScroll, 300));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevState, prevProps) {
    // console.log('component did update')
    // this.onAllShotsLoaded()
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.setState({ isLoading: true })
      setTimeout(() => {
        api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      }, 300);
      console.log("component just updated")
      // console.log('loading', document.readyState)
    }
  }

  onShotsReceived(data) {
    this.setState({
      shots: this.state.shots.concat(data),
      isLoading: false,
    })
  }

  // handleImageLoaded() {
  //   const galleryElement = this.refs.gallery;
  //   this.setState({
  //     loading: !this.shotsLoaded(galleryElement),
  //   });
  // }

    handleImageLoaded(){
      this.setState({
       imageStatus: 'Loaded',
     })
   }

  //  handleImageLoaded() {
  //   const galleryElement = this.refs.gallery;
  //   this.setState({
  //     isLoading: this.shotsLoaded(galleryElement), // #QnA  -- shotsLoaded turetu grazinti true arba false priklausomai nuo to ar visi shotai yra loaded
  //   });
  // }

  render() {
    return (
      <div>
        <ShotList data={this.state.shots}
          className="gallery"
          ref="gallery"
          handleImageLoaded={this.handleImageLoaded}
          imageStatus={this.state.imageStatus}
        />
        {
          this.state.isLoading ? <img className="loading-indicator" src={Spinner}></img> : null
        }
      </div>
    );
  }
}

export default App;

// </ShotList>//allLoaded={(this.state.loaded).toString()}//


//#QnA  1.perduodu per propsus funkciją į App.js. Noriu, kad ji pakeistų state'ą pagal tai ar visi shotai yra loaded ar ne
//Jeigu bandau tikrinti - kiek shotu yra loaded, negaliu tikrinti pagal length, kadangi tai nera array'us.

// 2. document.ready - document.onLoad
//





  //  HTMLImageElement.complete

