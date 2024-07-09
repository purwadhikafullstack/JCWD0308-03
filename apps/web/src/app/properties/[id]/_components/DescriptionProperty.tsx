import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Property } from "@/type/property.type"
import { IoIosArrowForward } from "react-icons/io"

interface DescriptionPropertyProps {
  property: Property;
}

export function DescriptionProperty({ property }: DescriptionPropertyProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button className="text-blue-500 bg-transparent hover:bg-transparent flex items-center mt-2">
          Show More <IoIosArrowForward className="ml-1 transform" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Detail Description</SheetTitle>
          <SheetDescription>
          Detailed information about the accommodation.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
            <p className="text-gray-700">{property.description}</p>
          </div>
        <SheetFooter>
          <SheetClose asChild className="ring-offset-0"/>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
