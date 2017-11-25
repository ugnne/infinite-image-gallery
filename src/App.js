import React, { Component } from 'react';
import ShotList from './Components/ShotList';
import api from './Components/Api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: [],
      pageNumber: 0,
      isLoading: false,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.addShots = this.addShots.bind(this)
  }

  componentDidMount() {
    api.getShots(++this.state.pageNumber, this.onShotsReceived.bind(this));
    this.addShots()
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      api.getShots(++this.state.pageNumber, this.onShotsReceived.bind(this))
    }
  }

  addShots() {
    if (window.innerHeight >= document.body.offsetHeight)
    api.getShots(++this.state.pageNumber, this.onShotsReceived.bind(this))
  }

  onShotsReceived(data) {
    this.setState({
      isLoading: false,
      shots: this.state.shots.concat(data)
    })
  }

  render() {
    console.log(this.state.shots);
    const url = api.getUrl(this.state.pageNumber);
    console.log(url);
    return (
      <ShotList data={this.state.shots} className="gallery" />
    );
  }
}

export default App;
