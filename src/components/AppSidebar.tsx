
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarHeader } from './SidebarHeader';
import { useApp } from '@/context/AppContext';
import { BarChartHorizontal, Users, CalendarClock, BookOpen, ScanLine, Settings } from 'lucide-react';

const AppSidebar = () => {
  const { activeView, setActiveView } = useApp();

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: BarChartHorizontal },
    { id: 'students', title: 'Students', icon: Users },
    { id: 'attendance', title: 'Attendance', icon: CalendarClock },
    { id: 'courses', title: 'Courses', icon: BookOpen },
    { id: 'rfid-simulator', title: 'RFID Simulator', icon: ScanLine },
    { id: 'settings', title: 'Settings', icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    className={activeView === item.id ? "bg-sidebar-accent text-white" : ""}
                    onClick={() => setActiveView(item.id)}
                  >
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
