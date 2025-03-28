
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Student } from '@/types';

const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rfidId: '',
    studentId: '',
    class: '',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: '',
    phone: '',
  });

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rfidId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open edit dialog
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  // Handle adding a new student
  const handleAddStudent = () => {
    addStudent(newStudent);
    setNewStudent({
      name: '',
      rfidId: '',
      studentId: '',
      class: '',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: '',
      phone: '',
    });
    setIsAddDialogOpen(false);
  };

  // Handle updating a student
  const handleUpdateStudent = () => {
    if (selectedStudent) {
      updateStudent(selectedStudent);
      setIsEditDialogOpen(false);
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search by name, ID, RFID tag, or class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="overflow-hidden card-hover">
            <CardContent className="p-0">
              <div className="aspect-[2/1] bg-gradient-to-r from-rfid-blue to-rfid-lightBlue flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white p-1">
                  <img
                    src={student.imageUrl}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{student.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <div>
                    <p className="text-gray-500">Student ID</p>
                    <p>{student.studentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">RFID Tag</p>
                    <p>{student.rfidId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Class</p>
                    <p>{student.class}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Registered</p>
                    <p>{student.registeredOn}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(student)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(student)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No students found. Try adjusting your search or add a new student.</p>
        </div>
      )}

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name">Full Name</label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="studentId">Student ID</label>
                <Input
                  id="studentId"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rfidId">RFID Tag ID</label>
                <Input
                  id="rfidId"
                  value={newStudent.rfidId}
                  onChange={(e) => setNewStudent({ ...newStudent, rfidId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="class">Class/Course</label>
                <Input
                  id="class"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone">Phone</label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name">Full Name</label>
                  <Input
                    id="edit-name"
                    value={selectedStudent.name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-studentId">Student ID</label>
                  <Input
                    id="edit-studentId"
                    value={selectedStudent.studentId}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, studentId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-rfidId">RFID Tag ID</label>
                  <Input
                    id="edit-rfidId"
                    value={selectedStudent.rfidId}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, rfidId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-class">Class/Course</label>
                  <Input
                    id="edit-class"
                    value={selectedStudent.class}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, class: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-email">Email</label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedStudent.email}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-phone">Phone</label>
                  <Input
                    id="edit-phone"
                    value={selectedStudent.phone}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Student Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedStudent?.name}'s record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStudent} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentManagement;
