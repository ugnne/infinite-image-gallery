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
      imageCount: 0,
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

    handleImageLoaded(count) {
      this.setState({
        imageCount: count
      })
   }

  render() {
    return (
      <div>
        {this.state.imageCount}
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


