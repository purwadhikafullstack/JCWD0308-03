'use client'
import EditProperty from "@/components/properties/EditProperty";
import { getPropertyById } from "@/lib/properties";
import { Property } from "@/type/property.type";
import React, { useEffect, useState } from 'react';

const EditorProperties = ({ params }: { params: { id: number } }) => {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const property = await getPropertyById(params.id);
        console.log('property : ', property);
        setProperty(property);
      } catch (error) {
        console.log("failed to get properties : ", error);
      }
    }

    fetchProperty();
  }, [params.id]);

  return (
    <div className="h-screen pt-32 px-3 md:px-10">
      {property ? <EditProperty property={property} /> : <div>Loading...</div>}
    </div>
  )
}

export default EditorProperties;
