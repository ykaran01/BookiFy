import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { SidebarProvider } from "@/components/ui/sidebar"
const AdminSidebarLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar/>
      <Outlet />   
    </SidebarProvider>
  )
}

export default AdminSidebarLayout