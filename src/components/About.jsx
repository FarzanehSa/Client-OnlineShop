import React, {useEffect} from 'react';

// test 1
import { useNavigate } from 'react-router-dom';

const About = () => {

//test 1
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      // navigate(-2);
      navigate('/')
    },2000)

    return (() => clearTimeout(timeout))
  }, [])


  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

export default About;