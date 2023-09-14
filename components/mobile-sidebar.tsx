import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { Menu, Sidebar } from "lucide-react"
 
export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden pr-m">
        <Menu  />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
       <Sidebar />
      </SheetContent>
    </Sheet>
  )
}