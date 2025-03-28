
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, RefreshCw, FileDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AttendanceLog = () => {
  const { attendanceRecords, students } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Get unique classes for filter
  const classes = [...new Set(attendanceRecords.map(record => record.class))];
  
  // Get unique dates for filter
  const dates = [...new Set(attendanceRecords.map(record => record.date))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Apply filters and search
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = dateFilter ? record.date === dateFilter : true;
    const matchesClass = classFilter ? record.class === classFilter : true;
    const matchesStatus = statusFilter ? record.status === statusFilter : true;
    
    return matchesSearch && matchesDate && matchesClass && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500">Late</Badge>;
      case 'absent':
        return <Badge className="bg-red-500">Absent</Badge>;
      case 'excused':
        return <Badge className="bg-blue-500">Excused</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Export attendance data to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Student ID', 'Student Name', 'Class', 'Time In', 'Time Out', 'Status'];
    
    const csvData = filteredRecords.map(record => [
      record.date,
      record.studentId,
      record.studentName,
      record.class,
      record.timeIn || 'N/A',
      record.timeOut || 'N/A',
      record.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Log</h1>
        <Button onClick={exportToCSV}>
          <FileDown className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search student or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Dates</SelectItem>
                {dates.map(date => (
                  <SelectItem key={date} value={date}>{formatDate(date)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="excused">Excused</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setDateFilter('');
              setClassFilter('');
              setStatusFilter('');
            }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.timeIn || 'N/A'}</TableCell>
                      <TableCell>{record.timeOut || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No attendance records found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceLog;
