
const getProperties = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}properties`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getProperties;
