import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  propertyId: number;
  currentUser?: any;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  propertyId,
  currentUser,
}) => {
  const hasFavorite = true;
  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart 
      size={24}
      className= {
        hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'
      }
      />
    </div>
  );
};
