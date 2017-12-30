import React from 'react';
import ReactDOM from 'react-dom'
import Shot from './Shot';
import PropTypes from 'prop-types';

class ShotList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
    }
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  handleImageLoaded() {
    this.setState({
      loaded: ++this.state.loaded
    })
  }

  // componentDidUpdate(nextProps) {
  //   if (this.props.data.length === this.state.loaded) {
  //       this.props.handleImageLoaded(this.state.loaded)
  //   }
  // }

  render() {
    return (
      <div className="gallery" >
        {this.props.data.map(shot =>
          <Shot
            ref="shotElement"
            url={shot.images.normal}
            title={shot.title}
            author={shot.user.name}
            key={shot.id}
            id={shot.id}
            handleImageLoaded={this.handleImageLoaded}
            imageStatus={this.props.imageStatus}
            className="image-wrapper mobile-visible"
          />
        )}
      </div>
    );
  }
}

export default ShotList

