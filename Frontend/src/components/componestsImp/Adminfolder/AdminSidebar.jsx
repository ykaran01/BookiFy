import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import {Link} from "react-router-dom"
const items = [
  {
    title: "Dashboard",
    link: '/admin'

  },
  {
    title: "Add Items",
    link: '/add'

  },
  {
    title: "Orders",
    link: '/pending'

  },
  {
    title: "Products",
    link: '/products'

  },
]

const AdminSidebar = () => {
  
  return (
    <Sidebar className="border-r border-zinc-800 bg-black text-white">
      <SidebarHeader className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-black px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black font-bold text-lg shadow-lg">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Admin Panel
            </h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>

            <div className="flex flex-col w-full" >
              {items.map((item) => (
               <Link  to={item.link}  className="w-full" > <button
                  className="
                      group
                      mb-2
                      rounded-xl
                      px-3
                      py-6
                      text-zinc-300
                      hover:bg-white
                      hover:text-black
                      w-full
                      cursor-pointer
                    "
                >
                  <span className="font-medium">
                    {item.title}
                  </span>
                </button>
                </Link>
              ))}
            </div>

          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
              <Link to='/' className="w-full" >
              <button className="w-full bg-orange-500 font-bold py-2  rounded-2xl" >
                Home
              </button>
              </Link>

      </SidebarFooter>


    </Sidebar>
  )
}

export default AdminSidebar