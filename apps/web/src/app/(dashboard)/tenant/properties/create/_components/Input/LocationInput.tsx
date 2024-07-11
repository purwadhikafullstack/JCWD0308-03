import { Label } from '@/components/ui/label';
import useDistricts from '@/hooks/useDistricts';
import useProvinces from '@/hooks/useProvices';
import useRegencies from '@/hooks/useRegencies';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

export type LocationSelectValue = {
  label: string;
  value: string;
};

interface LocationInputProps {
  provinceValue: LocationSelectValue;
  regencyValue: LocationSelectValue;
  districtValue: LocationSelectValue;
  onProvinceChange: (value: LocationSelectValue) => void;
  onRegencyChange: (value: LocationSelectValue) => void;
  onDistrictChange: (value: LocationSelectValue) => void;
  onAddressChange: (value: string) => void; 
  address: string; 
}

const LocationInput: React.FC<LocationInputProps> = ({
  provinceValue,
  regencyValue,
  districtValue,
  onProvinceChange,
  onRegencyChange,
  onDistrictChange,
  onAddressChange,
  address,
}) => {
  const { provinces, loading: provincesLoading, error: provincesError } = useProvinces();
  const { regencies, loading: regenciesLoading, error: regenciesError } = useRegencies(provinceValue?.value);
  const { districts, loading: districtsLoading, error: districtsError } = useDistricts(regencyValue?.value);

  const formatOptionLabel = (option: any) => (
    <div className="flex items-center">
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Field
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e:any) => onAddressChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#00a7c4]"
        />
        <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
      </div>
      
      <div>
        <Label htmlFor="province">Province</Label>
        <Select
          placeholder="Select Province"
          options={provinces.map((province) => ({ value: province.id, label: province.name }))}
          isClearable
          value={provinceValue}
          onChange={(value) => onProvinceChange(value as LocationSelectValue)}
          formatOptionLabel={formatOptionLabel}
          classNames={{
            control: () => 'p-1 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg',
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: '#00a7c4',
              primary25: '#f1f1f1',
            },
          })}
          isLoading={provincesLoading}
        />
      </div>

      {provinceValue && (
        <div>
          <Label htmlFor="regency">Regency</Label>
          <Select
            placeholder="Select Regency"
            options={regencies.map((regency) => ({ value: regency.id, label: regency.name }))}
            isClearable
            value={regencyValue}
            onChange={(value) => onRegencyChange(value as LocationSelectValue)}
            formatOptionLabel={formatOptionLabel}
            isLoading={regenciesLoading}
            classNames={{
              control: () => 'p-1 border-2',
              input: () => 'text-lg',
              option: () => 'text-lg',
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: '#00a7c4',
                primary25: '#f1f1f1',
              },
            })}
          />
        </div>
      )}

      {regencyValue && (
        <div>
          <Label htmlFor="district">District</Label>
          <Select
            placeholder="Select District"
            options={districts.map((district) => ({ value: district.id, label: district.name }))}
            isClearable
            value={districtValue}
            onChange={(value) => onDistrictChange(value as LocationSelectValue)}
            formatOptionLabel={formatOptionLabel}
            isLoading={districtsLoading}
            classNames={{
              control: () => 'p-1 border-2',
              input: () => 'text-lg',
              option: () => 'text-lg',
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: '#00a7c4',
                primary25: '#f1f1f1',
              },
            })}
          />
        </div>
      )}
    </div>
  );
};

export default LocationInput;
