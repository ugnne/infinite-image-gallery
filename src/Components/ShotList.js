import React from 'react';
import ReactDOM from 'react-dom'
import Shot from './Shot';
import PropTypes from 'prop-types';

class ShotList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pageNumber: 0,
      // loaded: false,
      // count: 0,
    }
  }

  render() {
    return (
      <div className="gallery" >
        {this.props.data.map(shot =>
          <Shot
            url={shot.images.normal}
            title={shot.title}
            author={shot.user.name}
            key={shot.id}
            id={shot.id}
            handleImageLoaded={this.props.handleImageLoaded}
            imageStatus={this.props.imageStatus}
            className="image-wrapper mobile-visible"
          />
        )}
      </div>
    );
  }
}

optionalArrayOf: PropTypes.arrayOf(PropTypes.number)


ShotList.propTypes = {
  // propArray: React.PropTypes.array.isRequired
  data: PropTypes.arrayOf(PropTypes.object).isRequired      // #QnA Noriu perduoti array'u i App.js, kad galėčiau matyti, ar visi shotai yra užloadinti
}

export default ShotList



// handleStateChange() {
//   // In React 0.13 use: 'this.refs.gallery.getDOMNode()'
//   const shotElement = this.refs.gallery;
//   this.setState({
//     loading: !imagesLoaded(galleryElement),
//   });
// }
