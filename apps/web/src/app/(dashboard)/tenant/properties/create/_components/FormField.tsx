import React from 'react';
import { Label } from '@/components/ui/label';
import { Field, ErrorMessage } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea'; // Updated type options to include 'textarea'
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type, placeholder }) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Field
            as="textarea"
            id={name}
            name={name}
            placeholder={placeholder}
            className="p-3 border border-gray-300 rounded-lg"
          />
        );
      case 'text':
      case 'number':
        return (
          <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="p-3 border border-gray-300 rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-1">
      <Label className="pt-5" htmlFor={name}>{label}</Label>
      {renderInput()}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FormField;
