import { useState, useEffect } from 'react';

interface Regency {
  id: string;
  name: string;
}

const useRegencies = (provinceId: string) => {
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegencies = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch regencies');
        }
        const data: Regency[] = await response.json();
        setRegencies(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegencies();
  }, [provinceId]);

  return { regencies, loading, error };
};

export default useRegencies;