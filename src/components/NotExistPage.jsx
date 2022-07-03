import React, {useEffect, useContext} from 'react';

import NavViewContext from '../contexts/NavViewContext';

const NotExistPage = () => {

  const {frontEndView} = useContext(NavViewContext);


  useEffect(() => {
    frontEndView();
  }, [])


  return (
    <div>
      <h2>Not Exist Page</h2>
    </div>
  );
};

export default NotExistPage;