import React from 'react';
import { Label } from '@/components/ui/label';
import { Field, ErrorMessage } from 'formik';
import { Checkbox } from '@/components/ui/checkbox';

interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'checkbox';
  value?: string; // Optional value for checkboxes
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type, placeholder, value }) => {
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
      case 'checkbox':
        return (
          <Field name={name}>
            {({ field }: any) => {
              const isChecked = field.value ? field.value.includes(value) : false;
              return (
                <Checkbox
                  checked={isChecked}
                  onChange={() => {
                    const nextValue = isChecked
                      ? field.value.filter((v: any) => v !== value)
                      : [...(field.value || []), value];
                    field.onChange({
                      target: {
                        name: field.name,
                        value: nextValue,
                      },
                    });
                  }}
                />
              );
            }}
          </Field>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`grid gap-1 ${type === 'checkbox' ? 'flex items-center space-x-3 ' : ''}`}>
      {type !== 'checkbox' && <Label className="pt-5" htmlFor={name}>{label}</Label>}
      {renderInput()}
      {type === 'checkbox' && <Label className="text-sm font-normal">{label}</Label>}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FormField;
