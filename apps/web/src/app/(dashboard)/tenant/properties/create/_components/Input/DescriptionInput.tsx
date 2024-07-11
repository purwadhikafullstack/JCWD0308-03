import React from 'react';
import { FieldProps } from 'formik';
import { Textarea } from '@/components/ui/textarea';

const DescriptionInput: React.FC<FieldProps> = ({ field, form }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor="description">Detailed Description</label>
      <Textarea
        id="description"
        {...field}
        placeholder="Detailed Description"
        onChange={(e:any) => form.setFieldValue('description', e.target.value)}
        onBlur={field.onBlur}
      />
      {/* {form.errors.description && form.touched.description ? (
        <div className="text-red-500 text-sm">{form.errors.description}</div>
      ) : null} */}
    </div>
  );
};

export default DescriptionInput;
