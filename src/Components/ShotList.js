import React from 'react';
import ReactDOM from 'react-dom'
import Shot from './Shot';

class NewShotList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      pageNumber: 0,
      isLoading: true,
      count: props.count
      }
    this.handlLoadedShots = this.handleLoadedShots.bind(this)
  }

  handleLoadedShots() {
    this.props.handleImageLoaded
  }

  render() {
    console.log( this.state.handleLoadedShots)
    return (
      <div className="gallery">
        {this.props.data.map(shot =>
          <Shot
          url={shot.images.normal}
          title={shot.title}
          author={shot.user.name}
          key={shot.id}
          id={shot.id}
          imageStatus='Loaded'
          className="image-wrapper mobile-visible"
          />
        )}
      </div>
    );
  }
}

export default NewShotList

