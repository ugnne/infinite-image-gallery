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

ShotList.propTypes = {
  // propArray: React.PropTypes.array.isRequired
  data: PropTypes.arrayOf(React.PropTypes.string),
  optionalFunc: PropTypes.func,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
}

export default ShotList

// import React from 'react';

// class Gallery extends React.Component {
//  // implementation will go here
// }
// Gallery.propTypes = {
//  imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
// };
// export default Gallery;
