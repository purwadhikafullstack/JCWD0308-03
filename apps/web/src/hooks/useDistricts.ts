import { useState, useEffect } from 'react';

interface District {
  id: string;
  name: string;
}

const useDistricts = (regencyId: string) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }
        const data: District[] = await response.json();
        setDistricts(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [regencyId]);

  return { districts, loading, error };
};

export default useDistricts;