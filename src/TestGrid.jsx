// src/components/ExamGrid.jsx
import React, { useState, useEffect } from 'react';

// Generate random mock data
const generateMockData = () => {
  const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];
  const courses = ['Course A', 'Course B', 'Course C'];
  
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    course: courses[Math.floor(Math.random() * courses.length)],
    examDate: '',
  }));
};

 export const TestGrid = () => {
  const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  // Generate mock data on component mount
  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
  }, []);

  const handleCellClick = (id, initialDate) => {
    setEditingCell(id);
    setCurrentDate(initialDate);
  };

  const handleDateChange = (e, id) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);

    // Update the date in the data array
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, examDate: newDate } : item))
    );
    setEditingCell(null);
  };

  return (
    <div className="grid grid-cols-4 gap-px bg-gray-200 p-2">
      {/* Render Headers */}
      <div className="bg-gray-300 p-3 font-bold text-center">Subject</div>
      <div className="bg-gray-300 p-3 font-bold text-center">Course</div>
      <div className="bg-gray-300 p-3 font-bold text-center">Exam Date</div>
      <div className="bg-gray-300 p-3 font-bold text-center">Actions</div>

      {/* Render Rows */}
      {data.map((exam) => (
        <React.Fragment key={exam.id}>
          {/* Subject */}
          <div className="bg-white p-3 border border-gray-300">{exam.subject}</div>
          {/* Course */}
          <div className="bg-white p-3 border border-gray-300">{exam.course}</div>
          {/* Exam Date */}
          <div
            className="bg-white p-3 border border-gray-300 cursor-pointer"
            onClick={() => handleCellClick(exam.id, exam.examDate)}
          >
            {editingCell === exam.id ? (
              <input
                type="date"
                className="w-full"
                value={currentDate}
                onChange={(e) => handleDateChange(e, exam.id)}
                onBlur={() => setEditingCell(null)}
              />
            ) : (
              exam.examDate || 'Set Date'
            )}
          </div>
          {/* Placeholder for Actions */}
          <div className="bg-white p-3 border border-gray-300 text-center">-</div>
        </React.Fragment>
      ))}
    </div>
  );
};


