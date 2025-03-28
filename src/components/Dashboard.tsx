
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarClock, Users, Clock, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { attendanceSummary, attendanceRecords, students } = useApp();

  // Create weekly attendance data
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Get the last 7 days of attendance data
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const weeklyData = last7Days.map(date => {
    const dayRecords = attendanceRecords.filter(record => record.date === date);
    const present = dayRecords.filter(record => record.status === 'present').length;
    const late = dayRecords.filter(record => record.status === 'late').length;
    const absent = (students.length) - present - late;
    
    return {
      day: getDayName(date),
      Present: present,
      Late: late,
      Absent: absent,
    };
  });

  // Create attendance by class data
  const classCounts: { [key: string]: { total: number; present: number; late: number; absent: number } } = {};
  
  students.forEach(student => {
    if (!classCounts[student.class]) {
      classCounts[student.class] = { total: 0, present: 0, late: 0, absent: 0 };
    }
    classCounts[student.class].total += 1;

    // Check today's attendance
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = attendanceRecords.find(
      record => record.studentId === student.studentId && record.date === today
    );

    if (todayRecord) {
      if (todayRecord.status === 'present') {
        classCounts[student.class].present += 1;
      } else if (todayRecord.status === 'late') {
        classCounts[student.class].late += 1;
      } else if (todayRecord.status === 'absent') {
        classCounts[student.class].absent += 1;
      }
    } else {
      classCounts[student.class].absent += 1;
    }
  });

  const classData = Object.keys(classCounts).map(className => ({
    name: className,
    Total: classCounts[className].total,
    Present: classCounts[className].present,
    Late: classCounts[className].late,
    Absent: classCounts[className].absent,
    AttendanceRate: ((classCounts[className].present + classCounts[className].late) / classCounts[className].total) * 100
  }));

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Students</p>
              <p className="text-3xl font-bold">{attendanceSummary.totalStudents}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-rfid-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Present Today</p>
              <p className="text-3xl font-bold">{attendanceSummary.present}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CalendarClock className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Late Today</p>
              <p className="text-3xl font-bold">{attendanceSummary.late}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Absent Today</p>
              <p className="text-3xl font-bold">{attendanceSummary.absent}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate: {attendanceSummary.attendanceRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-rfid-blue h-4 rounded-full" 
                style={{ width: `${attendanceSummary.attendanceRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Today's Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[150px]">
              <div className="w-32 h-32 rounded-full border-8 border-rfid-blue relative flex items-center justify-center">
                <div className="text-xl font-bold">{attendanceSummary.attendanceRate}%</div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  {attendanceSummary.present}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  {attendanceSummary.late}
                </div>
                <div className="absolute -bottom-2 -left-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  {attendanceSummary.absent}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Present" stackId="1" stroke="#4ade80" fill="#4ade80" />
                  <Area type="monotone" dataKey="Late" stackId="1" stroke="#facc15" fill="#facc15" />
                  <Area type="monotone" dataKey="Absent" stackId="1" stroke="#f87171" fill="#f87171" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Present" stackId="a" fill="#4ade80" />
                  <Bar dataKey="Late" stackId="a" fill="#facc15" />
                  <Bar dataKey="Absent" stackId="a" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
