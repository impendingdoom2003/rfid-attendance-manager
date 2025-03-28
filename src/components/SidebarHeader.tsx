
import React from 'react';
import { SidebarHeader as Header } from '@/components/ui/sidebar';

export const SidebarHeader = () => {
  return (
    <Header className="flex flex-col items-center justify-center py-6">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-rfid-blue"
          >
            <path d="M2 9.5V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1.5" />
            <path d="M2 13h10" />
            <path d="M5 10.5l-3.08 3.17a1.91 1.91 0 0 0 0 2.66L5 19.5" />
          </svg>
        </div>
        <div className="text-white">
          <h1 className="text-xl font-bold">RFID Attendance</h1>
          <p className="text-xs opacity-75">Management System</p>
        </div>
      </div>
    </Header>
  );
};
