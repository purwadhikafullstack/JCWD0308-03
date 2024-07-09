import { useState, useEffect } from 'react';

interface Provinces {
  id: string;
  name: string;
}

const useProvinces = () => {
  const [provinces, setProvinces] = useState<Provinces[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }
        const data: Provinces[] = await response.json();
        setProvinces(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { provinces, loading, error };
};

export default useProvinces;
