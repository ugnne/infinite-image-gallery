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
      isLoading: true,
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.addShots = this.addShots.bind(this)
  }

  componentDidMount() {
    api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
    console.log("component just mounted")
    window.addEventListener('scroll', debounce(this.handleScroll, 300));
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevState, prevProps) {
    console.log('component did update')
    this.addShots()
  }


  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      console.log("component just updated")
    }
  }

  addShots() {
    console.log(window.innerHeight, '>=', document.body.offsetHeight, ' -> ', window.innerHeight >= document.body.offsetHeight)
    if (window.innerHeight >= document.body.offsetHeight) {
      api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      console.log("shots added")
    }
  }

  onShotsReceived(data) {
    this.setState({ shots: this.state.shots.concat(data),
                    isLoading: false })
    console.trace('state update')
  }

  render() {
    console.log('page number: ', this.state.pageNumber)
    return (
      <div>
      {
        (this.state.isLoading)
        ? <img className="loading-indicator" src={ Spinner }></img>
        : <ShotList data={this.state.shots} className="gallery" />
      }
      </div>
    );
  }
}

export default App;



// setTimeout(() => {
//   this.setState({isLoading: true})
// },300)
