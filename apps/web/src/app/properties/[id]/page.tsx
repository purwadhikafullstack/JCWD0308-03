'use client'

import EmptyState from '@/components/EmptyState';
import { getPropertyById } from '@/lib/properties';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Property {
  id: number;
  name: string;
  // Add other property fields as needed
}

export const PropertyDetail = () => {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const id = +params.id;
        const property = await getPropertyById(id);
        console.log('property on properts[id] : ', property);
        setProperty(property);
      } catch (error) {
        console.log('failed to get properties on properties[id] : ', error);
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [params]);

  if (loading) {
    return <div className='p-40'>Loading...</div>;
  }

  if (error) {
    return <div className='p-40'>{error}</div>;
  }

  if (!property){
    return(
      <EmptyState/>
    )
  }

  
  return (
    <div className='p-40'>
      <h1>Property Detail</h1>
      
    </div>
  );
}

export default PropertyDetail;
