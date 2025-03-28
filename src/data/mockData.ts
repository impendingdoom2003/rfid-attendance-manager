
import { Student, AttendanceRecord, Course, RFIDEvent, AttendanceSummary } from "../types";

// Mock Student Data
export const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    rfidId: "A1B2C3D4",
    studentId: "S1001",
    class: "CS101",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    registeredOn: "2023-01-15"
  },
  {
    id: "2",
    name: "Jane Smith",
    rfidId: "E5F6G7H8",
    studentId: "S1002",
    class: "CS101",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "jane.smith@example.com",
    phone: "+1-555-234-5678",
    registeredOn: "2023-01-16"
  },
  {
    id: "3",
    name: "Michael Johnson",
    rfidId: "I9J0K1L2",
    studentId: "S1003",
    class: "CS102",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "michael.johnson@example.com",
    phone: "+1-555-345-6789",
    registeredOn: "2023-01-20"
  },
  {
    id: "4",
    name: "Emily Davis",
    rfidId: "M3N4O5P6",
    studentId: "S1004",
    class: "CS102",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "emily.davis@example.com",
    phone: "+1-555-456-7890",
    registeredOn: "2023-01-22"
  },
  {
    id: "5",
    name: "David Wilson",
    rfidId: "Q7R8S9T0",
    studentId: "S1005",
    class: "CS101",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "david.wilson@example.com",
    phone: "+1-555-567-8901",
    registeredOn: "2023-01-25"
  }
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "S1001",
    studentName: "John Doe",
    class: "CS101",
    date: "2023-04-01",
    timeIn: "09:05:32",
    timeOut: "11:30:15",
    status: "present"
  },
  {
    id: "2",
    studentId: "S1002",
    studentName: "Jane Smith",
    class: "CS101",
    date: "2023-04-01",
    timeIn: "09:10:45",
    timeOut: "11:32:21",
    status: "present"
  },
  {
    id: "3",
    studentId: "S1003",
    studentName: "Michael Johnson",
    class: "CS102",
    date: "2023-04-01",
    timeIn: "14:03:12",
    timeOut: "16:01:45",
    status: "present"
  },
  {
    id: "4",
    studentId: "S1004",
    studentName: "Emily Davis",
    class: "CS102",
    date: "2023-04-01",
    timeIn: "14:15:38",
    timeOut: "16:02:30",
    status: "late"
  },
  {
    id: "5",
    studentId: "S1005",
    studentName: "David Wilson",
    class: "CS101",
    date: "2023-04-01",
    timeIn: "",
    timeOut: null,
    status: "absent"
  },
  {
    id: "6",
    studentId: "S1001",
    studentName: "John Doe",
    class: "CS101",
    date: "2023-04-02",
    timeIn: "09:02:18",
    timeOut: "11:31:05",
    status: "present"
  },
  {
    id: "7",
    studentId: "S1002",
    studentName: "Jane Smith",
    class: "CS101",
    date: "2023-04-02",
    timeIn: "09:25:33",
    timeOut: "11:30:42",
    status: "late"
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    instructor: "Dr. Robert Brown",
    schedule: "Mon, Wed 9:00-11:30",
    room: "Building A, Room 101"
  },
  {
    id: "2",
    name: "Data Structures and Algorithms",
    instructor: "Dr. Sarah Miller",
    schedule: "Tue, Thu 14:00-16:30",
    room: "Building B, Room 205"
  },
  {
    id: "3",
    name: "Web Development",
    instructor: "Prof. James Wilson",
    schedule: "Fri 13:00-17:00",
    room: "Tech Lab, Room 305"
  }
];

// Mock RFID Events (for simulation)
export const mockRFIDEvents: RFIDEvent[] = [
  {
    id: "1",
    rfidTag: "A1B2C3D4",
    timestamp: "2023-04-02 09:02:18",
    status: "success",
    message: "Student John Doe clocked in for CS101"
  },
  {
    id: "2",
    rfidTag: "E5F6G7H8",
    timestamp: "2023-04-02 09:25:33",
    status: "success",
    message: "Student Jane Smith clocked in for CS101 (marked late)"
  },
  {
    id: "3",
    rfidTag: "UNKNOWN",
    timestamp: "2023-04-02 10:15:22",
    status: "error",
    message: "Unknown RFID tag detected"
  },
  {
    id: "4",
    rfidTag: "A1B2C3D4",
    timestamp: "2023-04-02 11:31:05",
    status: "success",
    message: "Student John Doe clocked out from CS101"
  },
  {
    id: "5",
    rfidTag: "E5F6G7H8",
    timestamp: "2023-04-02 11:30:42",
    status: "success",
    message: "Student Jane Smith clocked out from CS101"
  }
];

// Mock Attendance Summary
export const mockAttendanceSummary: AttendanceSummary = {
  totalStudents: 5,
  present: 3,
  late: 1,
  absent: 1,
  excused: 0,
  attendanceRate: 80
};
