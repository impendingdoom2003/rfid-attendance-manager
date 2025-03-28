
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppProvider } from '@/context/AppContext';
import AppSidebar from '@/components/AppSidebar';
import MainContent from '@/components/MainContent';

const Index = () => {
  return (
    <AppProvider>
      <SidebarProvider>
        <div className="h-screen flex overflow-hidden">
          <AppSidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </AppProvider>
  );
};

export default Index;
