import React from 'react';
import Shot from './Shot';

const ShotList = props => {

  const results = props.data;
  let shots;

    shots = results.map(shot => <Shot
      url={shot.images.normal}
      title={shot.title}
      author={shot.user.name}
      key={shot.id}
      id={shot.id}
      />);

  return (
    <div className="gallery">
      { shots }
    </div>
  );
}

export default ShotList;
