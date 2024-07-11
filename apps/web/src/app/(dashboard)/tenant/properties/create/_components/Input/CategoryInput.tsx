import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps  {
  icon: IconType;
  label: string;
  field: any;
  form:any
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  field,
  form,
  label,
  icon: Icon,
}) => {
  const isSelected = field.value === label;

  const handleClick = () => {
    form.setFieldValue(field.name, isSelected ? "" : label);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl group border-4 p-4 flex flex-col gap-4 hover:border-[#00a7c4] ${
        isSelected ? "border-[#00a7c4]" : "border-neutral-200"
      }`}
    >
      <Icon size={30} fill={isSelected ? "#00a7c4" : "gray"} className="group-hover:fill-[#00a7c4]" />
      <div className={`font-semibold group-hover:text-[#00a7c4]  ${isSelected ? "text-[#00a7c4]" : "text-gray-600"}`}>{label}</div>
    </div>
  );
};

export default CategoryInput;



