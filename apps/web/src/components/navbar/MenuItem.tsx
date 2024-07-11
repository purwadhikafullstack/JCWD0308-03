'use client';
interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="text-[#4a4a4a] px-4 py-3 hover:bg-[#f5f5f5] hover:cursor-pointer transition font-semibold"
    >
      {label}
    </div>
  );
};
