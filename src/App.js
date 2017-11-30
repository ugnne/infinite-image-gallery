import React, { Component } from 'react';
import ShotList from './Components/ShotList';
import api from './Components/Api';
import debounce from './utilities'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: [],
      pageNumber: 0,
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.addShots = this.addShots.bind(this)
  }

  componentDidMount() {
    api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
    console.log("component just mounted")
    window.addEventListener('scroll', debounce(this.handleScroll, 300));
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevState, prevProps) {
      this.addShots()
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      console.log("component just updated")
    }
  }

  addShots() {
    if (window.innerHeight >= document.body.offsetHeight) {
      api.getShots(++this.state.pageNumber).then(this.onShotsReceived.bind(this));
      console.log("shots added")
    }
  }

  onShotsReceived(data) {
    console.trace('--------------------->')
    this.setState({ shots: this.state.shots.concat(data) })
  }

  render() {
    console.log(this.state.pageNumber)
    return (
      <ShotList data={this.state.shots} className="gallery" />
    );
  }
}

export default App;
