import useProvinces from '@/hooks/useProvices';
import React from 'react';
import Select from 'react-select';

interface ProvinceSelectProps {
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({
  selectedProvince,
  setSelectedProvince,
}) => {
  const { provinces, loading, error } = useProvinces();

  if (loading) return <p>Loading provinces...</p>;
  if (error) return <p>Error loading provinces: {error}</p>;

  const options = provinces.map((province) => ({
    value: province.id,
    label: province.name,
  }));

  return (
    <Select
      value={options.find((option) => option.value === selectedProvince)}
      onChange={(option) => setSelectedProvince(option?.value ?? '')}
      options={options}
      placeholder="Anywhere"
      className="w-full "
    />
  );
};

export default ProvinceSelect;