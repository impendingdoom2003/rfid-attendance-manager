
export interface Student {
  id: string;
  name: string;
  rfidId: string;
  studentId: string;
  class: string;
  imageUrl: string;
  email: string;
  phone: string;
  registeredOn: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  timeIn: string;
  timeOut: string | null;
  status: 'present' | 'late' | 'absent' | 'excused';
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
  room: string;
}

export interface AttendanceSummary {
  totalStudents: number;
  present: number;
  late: number;
  absent: number;
  excused: number;
  attendanceRate: number;
}

export interface RFIDEvent {
  id: string;
  rfidTag: string;
  timestamp: string;
  status: 'success' | 'unknown' | 'error';
  message: string;
}
