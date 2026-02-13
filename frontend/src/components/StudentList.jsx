import axios from 'axios';

export default function StudentList({ students, onUpdate, onEdit }) {
    
    const handleDelete = (roll_no) => {
        if (window.confirm("Are you sure?")) {
            axios.delete(`http://localhost:5000/delete-student/${roll_no}`)
                .then(() => onUpdate()) // Refresh after delete
                .catch(err => console.log(err));
        }
    };

    return (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th>Roll No</th><th>Name</th><th>Email</th><th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((s) => (
                    <tr key={s.roll_no}>
                        <td>{s.roll_no}</td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>
                            <button onClick={() => onEdit(s)} style={{ marginRight: '10px', color: 'blue' }}>Edit</button>
                            <button onClick={() => handleDelete(s.roll_no)} style={{ color: 'red' }}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            
        </table>
    );
}