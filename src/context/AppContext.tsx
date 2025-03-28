
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "sonner";
import { Student, AttendanceRecord, Course, RFIDEvent, AttendanceSummary } from '../types';
import { mockStudents, mockAttendanceRecords, mockCourses, mockRFIDEvents, mockAttendanceSummary } from '../data/mockData';

interface AppContextType {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  courses: Course[];
  rfidEvents: RFIDEvent[];
  attendanceSummary: AttendanceSummary;
  activeView: string;
  setActiveView: (view: string) => void;
  addStudent: (student: Omit<Student, 'id' | 'registeredOn'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendanceRecord: (record: AttendanceRecord) => void;
  deleteAttendanceRecord: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  simulateRFIDScan: (rfidId: string) => void;
  getStudentByRFID: (rfidId: string) => Student | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [rfidEvents, setRfidEvents] = useState<RFIDEvent[]>(mockRFIDEvents);
  const [attendanceSummary, setAttendanceSummary] = useState<AttendanceSummary>(mockAttendanceSummary);
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Add a new student
  const addStudent = (student: Omit<Student, 'id' | 'registeredOn'>) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      registeredOn: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, newStudent]);
    toast.success(`Student ${newStudent.name} added successfully!`);
  };

  // Update a student
  const updateStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    toast.success(`Student ${updatedStudent.name} updated successfully!`);
  };

  // Delete a student
  const deleteStudent = (id: string) => {
    const studentToDelete = students.find(student => student.id === id);
    setStudents(students.filter(student => student.id !== id));
    if (studentToDelete) {
      toast.success(`Student ${studentToDelete.name} deleted successfully!`);
    }
  };

  // Add attendance record
  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: Date.now().toString()
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
  };

  // Update attendance record
  const updateAttendanceRecord = (updatedRecord: AttendanceRecord) => {
    setAttendanceRecords(attendanceRecords.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
  };

  // Delete attendance record
  const deleteAttendanceRecord = (id: string) => {
    setAttendanceRecords(attendanceRecords.filter(record => record.id !== id));
  };

  // Add course
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString()
    };
    setCourses([...courses, newCourse]);
    toast.success(`Course ${newCourse.name} added successfully!`);
  };

  // Update course
  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    toast.success(`Course ${updatedCourse.name} updated successfully!`);
  };

  // Delete course
  const deleteCourse = (id: string) => {
    const courseToDelete = courses.find(course => course.id === id);
    setCourses(courses.filter(course => course.id !== id));
    if (courseToDelete) {
      toast.success(`Course ${courseToDelete.name} deleted successfully!`);
    }
  };

  // Get student by RFID
  const getStudentByRFID = (rfidId: string): Student | undefined => {
    return students.find(student => student.rfidId === rfidId);
  };

  // Simulate RFID scan
  const simulateRFIDScan = (rfidId: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const student = getStudentByRFID(rfidId);
    
    let newEvent: RFIDEvent;
    
    if (student) {
      // Find if student already has a record today without a timeOut
      const today = new Date().toISOString().split('T')[0];
      const existingRecord = attendanceRecords.find(
        record => record.studentId === student.studentId && 
                 record.date === today && 
                 !record.timeOut
      );
      
      if (existingRecord) {
        // Clock out
        const timeOut = new Date().toTimeString().split(' ')[0];
        updateAttendanceRecord({
          ...existingRecord,
          timeOut
        });
        
        newEvent = {
          id: Date.now().toString(),
          rfidTag: rfidId,
          timestamp,
          status: 'success',
          message: `Student ${student.name} clocked out from ${student.class}`
        };
        
        toast.success(`${student.name} clocked out successfully!`);
      } else {
        // Clock in
        const timeIn = new Date().toTimeString().split(' ')[0];
        const isLate = new Date().getHours() >= 9 && new Date().getMinutes() > 15;
        
        addAttendanceRecord({
          studentId: student.studentId,
          studentName: student.name,
          class: student.class,
          date: today,
          timeIn,
          timeOut: null,
          status: isLate ? 'late' : 'present'
        });
        
        newEvent = {
          id: Date.now().toString(),
          rfidTag: rfidId,
          timestamp,
          status: 'success',
          message: `Student ${student.name} clocked in for ${student.class}${isLate ? ' (marked late)' : ''}`
        };
        
        toast.success(`${student.name} clocked in successfully!${isLate ? ' (Late)' : ''}`);
      }
    } else {
      newEvent = {
        id: Date.now().toString(),
        rfidTag: rfidId,
        timestamp,
        status: 'error',
        message: 'Unknown RFID tag detected'
      };
      
      toast.error('Unknown RFID tag detected!');
    }
    
    setRfidEvents([newEvent, ...rfidEvents.slice(0, 10)]);
    
    // Update attendance summary
    updateAttendanceSummary();
  };

  // Update attendance summary stats
  const updateAttendanceSummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendanceRecords.filter(record => record.date === today);
    
    const present = todayRecords.filter(record => record.status === 'present').length;
    const late = todayRecords.filter(record => record.status === 'late').length;
    const absent = students.length - present - late;
    const excused = todayRecords.filter(record => record.status === 'excused').length;
    
    const attendanceRate = students.length > 0 
      ? Math.round(((present + late) / students.length) * 100) 
      : 0;
    
    setAttendanceSummary({
      totalStudents: students.length,
      present,
      late,
      absent,
      excused,
      attendanceRate
    });
  };

  // Update attendance summary whenever relevant data changes
  useEffect(() => {
    updateAttendanceSummary();
  }, [students, attendanceRecords]);

  return (
    <AppContext.Provider
      value={{
        students,
        attendanceRecords,
        courses,
        rfidEvents,
        attendanceSummary,
        activeView,
        setActiveView,
        addStudent,
        updateStudent,
        deleteStudent,
        addAttendanceRecord,
        updateAttendanceRecord,
        deleteAttendanceRecord,
        addCourse,
        updateCourse,
        deleteCourse,
        simulateRFIDScan,
        getStudentByRFID
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
