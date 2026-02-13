import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchComponent from './components/SearchComponent'; // 1. Import it
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import it as a function, not just a side-effect

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/data');
      setStudents(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter logic: This automatically returns 'students' if searchTerm is empty
  const filteredStudents = students.filter((s) => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.roll_no.toString().includes(searchTerm)
  );

 const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    // Prepare your data
    const tableRows = filteredStudents.map(s => [s.roll_no, s.name, s.email]);

    // FIX: Call autoTable as a separate function, passing 'doc' as the first argument
    autoTable(doc, {
        startY: 30,
        head: [['Roll No', 'Name', 'Email']],
        body: tableRows,
        theme: 'striped', // Optional: makes it look nicer
        headStyles: { fillColor: [74, 144, 226] } // Matching our blue theme
    });

    doc.save("student_report.pdf");
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };
  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <SearchComponent onSearch={setSearchTerm} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#333' }}>Student Management</h1>
        
        {/* The Download Button */}
        <button 
          disabled={filteredStudents.length === 0} // Disable if no students to show
          onClick={downloadPDF} 
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer' 
          }
          
        }
        >
          Download PDF Report
        </button>
      </div>

      <StudentForm onUpdate={fetchStudents} editingStudent={editingStudent} setEditingStudent={setEditingStudent} />
      <hr style={{ margin: '30px 0' }} />
      <StudentList students={filteredStudents} onUpdate={fetchStudents} onEdit={handleEditClick} />
    </div>
  );
}

export default App;