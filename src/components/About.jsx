import React, {useEffect, useContext} from 'react';

import NavViewContext from '../contexts/NavViewContext';

const About = () => {

  const {frontEndView} = useContext(NavViewContext);


  useEffect(() => {
    frontEndView();
  }, [])


  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

export default About;