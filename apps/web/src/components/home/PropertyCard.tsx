import React from 'react';

interface PropertieCardProps {
  name: string;
  description: string;
  category: string;
  pictures: string;
  
}

const PropertyCard: React.FC<PropertieCardProps> = ({
  name,
  description,
  category,
  pictures,
}) => {
  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{category}</div>
      
      {/* <div>{pictures}</div> */}
    </div>
  );
};

export default PropertyCard;
