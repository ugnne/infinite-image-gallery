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
      pageNumber: 0,
      count: 0,
      isLoading: true,
    }

    this.handleScroll = this.handleScroll.bind(this)
    // this.addShots = this.addShots.bind(this)
    this.onAllShotsLoaded = this.onAllShotsLoaded.bind(this)
  }

  // componentWillMount() {
  //   this.setState({ isLoading: true });
  // }

  componentDidMount() {
    api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
    console.log("component just mounted")
    window.addEventListener('scroll', debounce(this.handleScroll, 300));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevState, prevProps) {
    console.log('component did update')
    this.onAllShotsLoaded()
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.setState({isLoading:true})
      setTimeout(() => {
   api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this)); }, 300);
      // api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      console.log("component just updated")
      console.log('loading', document.readyState)
    }
  }

  onAllShotsLoaded() {
    if (this.state.count === this.state.shots.length) {
      api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      // this.setState({count: this.state.count++})
    }
  }

  onShotsReceived(data) {
    this.setState({
      shots: this.state.shots.concat(data),
      isLoading: false,
    })
  }

  // console.trace('state update')
  render() {
    console.log("Current Shots Length", this.state.shots.length)
    console.log('page number: ', this.state.pageNumber)
    return (
      <div>
        <ShotList data={this.state.shots} className="gallery" onShotsLoaded={this.onAllShotsLoaded} />
        {
          this.state.isLoading ? <img className="loading-indicator" src={Spinner}></img> : null
        }
      </div>
    );
  }
}

export default App;
