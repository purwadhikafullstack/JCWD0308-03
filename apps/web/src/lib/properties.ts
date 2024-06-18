import axios from 'axios';
import React from 'react';

const getProperties = async () => {
  const data = await axios.get(`http://localhost:8000/api/properties`);

//   console.log(data.data.properties);
  return data.data.properties;
};

export default getProperties;
