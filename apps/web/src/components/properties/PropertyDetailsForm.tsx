import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Property } from '@/type/property.type';

interface PropertyDetailsFormProps {
  editedProperty: Property;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({
  editedProperty,
  handleChange,
}) => {
  return (
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={editedProperty.name} onChange={handleChange} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={editedProperty.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={editedProperty.category}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="city">City</Label>
        <Input id="city" value={editedProperty.city} onChange={handleChange} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="province">Province</Label>
        <Input
          id="province"
          value={editedProperty.province}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="district">District</Label>
        <Input
          id="district"
          value={editedProperty.district}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={editedProperty.address}
          onChange={handleChange}
        />
      </div>
    </CardContent>
  );
};

export default PropertyDetailsForm;
