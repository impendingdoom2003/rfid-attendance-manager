
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, Book } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Course } from '@/types';

const CourseManagement = () => {
  const { courses, addCourse, updateCourse, deleteCourse, students } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    instructor: '',
    schedule: '',
    room: '',
  });

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count students in each course
  const getStudentCount = (courseName: string) => {
    return students.filter(student => student.class === courseName).length;
  };

  // Open edit dialog
  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  // Handle adding a new course
  const handleAddCourse = () => {
    addCourse(newCourse);
    setNewCourse({
      name: '',
      instructor: '',
      schedule: '',
      room: '',
    });
    setIsAddDialogOpen(false);
  };

  // Handle updating a course
  const handleUpdateCourse = () => {
    if (selectedCourse) {
      updateCourse(selectedCourse);
      setIsEditDialogOpen(false);
    }
  };

  // Handle deleting a course
  const handleDeleteCourse = () => {
    if (selectedCourse) {
      deleteCourse(selectedCourse.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search by course name, instructor, or room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Book className="h-5 w-5 mr-2 text-rfid-blue" />
                {course.name}
              </CardTitle>
              <CardDescription>Instructor: {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="text-sm">{course.schedule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p className="text-sm">{course.room}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Students Enrolled</p>
                  <p className="text-sm font-medium">{getStudentCount(course.name)}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(course)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No courses found. Try adjusting your search or add a new course.</p>
        </div>
      )}

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name">Course Name</label>
              <Input
                id="name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="instructor">Instructor</label>
              <Input
                id="instructor"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="schedule">Schedule</label>
              <Input
                id="schedule"
                value={newCourse.schedule}
                onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                placeholder="e.g., Mon, Wed 9:00-11:30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="room">Room</label>
              <Input
                id="room"
                value={newCourse.room}
                onChange={(e) => setNewCourse({ ...newCourse, room: e.target.value })}
                placeholder="e.g., Building A, Room 101"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddCourse}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name">Course Name</label>
                <Input
                  id="edit-name"
                  value={selectedCourse.name}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-instructor">Instructor</label>
                <Input
                  id="edit-instructor"
                  value={selectedCourse.instructor}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, instructor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-schedule">Schedule</label>
                <Input
                  id="edit-schedule"
                  value={selectedCourse.schedule}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, schedule: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-room">Room</label>
                <Input
                  id="edit-room"
                  value={selectedCourse.room}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, room: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course "{selectedCourse?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseManagement;
