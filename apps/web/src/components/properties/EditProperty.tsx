'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ImageSection from "./ImageSection"
import { Property, Room } from "@/type/property.type";

export function EditProperty({ property }: { property: Property }) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  Edit the property details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={property.name} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" defaultValue={property.description} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" defaultValue={property.category} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={property.city} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" defaultValue={property.province} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue={property.address} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" defaultValue={property.district} />
                </div>
                {/* Add more fields as necessary */}
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photo Tour</CardTitle>
                <CardDescription>
                  Manage and add photos for your property.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageSection images={property.PropertyPicture} title="Property Photos" />
                {property.rooms.map((room:Room, idx:any) => (
                  <ImageSection key={idx} images={room.RoomPicture} title={`Room ${room.type} Photos`} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[380px]">
        <Card>
          <CardHeader>
            <CardTitle>Property Info</CardTitle>
            <CardDescription>
              General information about your property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Property info content */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditProperty;
