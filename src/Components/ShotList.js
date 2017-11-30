import React from 'react';
import Shot from './Shot';

const ShotList = props => {
  let shots = props.data.map( shot =>
    <Shot
      url={shot.images.normal}
      title={shot.title}
      author={shot.user.name}
      key={shot.id}
      id={shot.id}
      callback={this.count}
      className="mobile-visible" />
   );

  return (
    <div className="gallery">
      { shots }
    </div>
  );
}

export default ShotList;
