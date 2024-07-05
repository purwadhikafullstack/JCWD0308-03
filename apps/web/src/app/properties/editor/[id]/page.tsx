'use client'

import { EditProperty } from "@/components/properties/EditProperty";
import Wrapper from "@/components/wrapper";
import { getPropertyById } from "@/lib/properties";
import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react';

const EditorProperties = () => {
  const params = useParams();
  const [property, setProperty] = useState({});
  useEffect(() => {
    async function fetchProperty() {
      try {
        const id = +params.id;
        const property = await getPropertyById(id)
        console.log('property : ', property);
        setProperty(property)
      } catch (error) {
        console.log("failed to get properties : ", error);
      }    
    }

    fetchProperty()
  },[params.id])

  return (
    <Wrapper>
     <h1>Editor Properties</h1>
     <EditProperty />
    </Wrapper>
  )
}

export default EditorProperties;
