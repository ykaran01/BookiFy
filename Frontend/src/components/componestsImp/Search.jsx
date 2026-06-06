import { Search } from "lucide-react";

export default function SearchBar({query ,setquery}) {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400 " />
      </div>
      <input
      value={query}
      onChange={(e)=>{
        e.preventDefault()
        setquery(e.target.value)
      }}
        type="text"
        placeholder="Search for books "
        className="outline-none  w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full 
                   text-sm placeholder-gray-400  text-black"
      />
    </div>
  );
}