
import React from 'react';
import { useApp } from '@/context/AppContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Dashboard from './Dashboard';
import StudentManagement from './StudentManagement';
import AttendanceLog from './AttendanceLog';
import CourseManagement from './CourseManagement';
import RFIDSimulator from './RFIDSimulator';
import Settings from './Settings';

const MainContent = () => {
  const { activeView } = useApp();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceLog />;
      case 'courses':
        return <CourseManagement />;
      case 'rfid-simulator':
        return <RFIDSimulator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
        <SidebarTrigger />
        <div className="ml-4">
          <h2 className="text-lg font-medium">RFID Attendance Management System</h2>
          <p className="text-sm text-gray-500">Educational Institution Edition</p>
        </div>
      </div>
      <div className="container mx-auto">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;
