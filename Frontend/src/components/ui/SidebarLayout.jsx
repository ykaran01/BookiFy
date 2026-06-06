import { Outlet } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/ui/AppSidebar.jsx"

const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />   
    </SidebarProvider>
  )
}

export default SidebarLayout