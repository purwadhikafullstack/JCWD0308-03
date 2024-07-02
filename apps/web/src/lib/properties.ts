
const getProperties = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/properties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getProperties;
