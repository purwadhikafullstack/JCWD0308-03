export const getProperties = async () => {
  const res = await fetch('http://localhost:8000/api/properties', {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};
