import React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
const Dropdown = ({selectedCategory ,setSelectedCategory ,sortOrder ,setSortOrder}) => {
  const category = useSelector((state) => state.category.values)
  return (
    <DropdownMenu className="max-w-full bg-slate-700 outline-1 outline-white" >
      <DropdownMenuTrigger asChild>
        <Button className="bg-slate-900 w-full text-white border-zinc-700 hover:bg-slate-800">Sort & Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 text-white border-zinc-700">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-zinc-900 text-white border-zinc-700">
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
              {category.map((cap) => (
                <DropdownMenuRadioItem key={cap._id} value={cap._id}>
                  {cap.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Price</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-zinc-900 text-white border-zinc-700">
            <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <DropdownMenuRadioItem value="1">Low → High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="-1">High → Low</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown