// import { Field } from "formik";
// import { IconType } from "react-icons";

// interface CategoryInputProps {
//     icon: IconType;
//     label: string;
//     selected?: boolean;
//     onClick: (value: string) => void;
// }

// const CategoryInput:React.FC<CategoryInputProps> = ({
//     icon: Icon,
//     label,
//     selected,
//     onClick,

// }) => {
//     return (
//         <div 
//         onClick={() => onClick(label)} 
//         className={`rounded-xl border-2 p-4 flex flex-col gap-4 hover:border-black cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
//            <Icon size={30} fill={selected ? 'black' : 'gray'} />
//            <div className="font-semibold">{label}</div>
//         </div>
//     );
// };

// export default CategoryInput

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
      className={`rounded-xl border-2 p-4 flex flex-col gap-4 hover:border-black cursor-pointer ${
        isSelected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} fill={isSelected ? "black" : "gray"} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;



