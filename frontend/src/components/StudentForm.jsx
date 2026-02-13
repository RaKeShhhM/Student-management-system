import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentForm({ onUpdate, editingStudent, setEditingStudent }) {
    const [values, setValues] = useState({ name: '', email: '', roll_no: '' });
    
    // 1. Add this state to track validation errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingStudent) {
            setValues(editingStudent);
            setErrors({}); // Clear errors when switching to edit mode
        }
    }, [editingStudent]);

    // 2. The Validation Function
    const validate = () => {
        let tempErrors = {};
        if (!values.name.trim()) tempErrors.name = "Name is required";
        else if (values.name.length < 3) tempErrors.name = "Min 3 characters required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!values.email) tempErrors.email = "Email is required";
        else if (!emailRegex.test(values.email)) tempErrors.email = "Invalid email format";

        if (!values.roll_no) tempErrors.roll_no = "Roll number is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 3. Run validation before sending to Backend
        if (!validate()) return;

        const request = editingStudent 
            ? axios.put(`http://localhost:5000/update-student/${values.roll_no}`, values)
            : axios.post('http://localhost:5000/add-student', values);

        request.then(() => {
            setValues({ name: '', email: '', roll_no: '' });
            setErrors({}); // Clear errors on success
            onUpdate();
            if(editingStudent) setEditingStudent(null);
        }).catch(err => {
            alert("Database error: Roll number might already exist.");
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: 'auto' }}>
            
            {/* Roll No Field */}
            <div>
                <input 
                    style={{ width: '100%', padding: '8px' }}
                    value={values.roll_no} 
                    placeholder="Roll No" 
                    disabled={!!editingStudent} 
                    onChange={e => setValues({...values, roll_no: e.target.value})} 
                />
                {errors.roll_no && <div style={{ color: 'red', fontSize: '12px' }}>{errors.roll_no}</div>}
            </div>

            {/* Name Field */}
            <div>
                <input 
                    style={{ width: '100%', padding: '8px' }}
                    value={values.name} 
                    placeholder="Name" 
                    onChange={e => setValues({...values, name: e.target.value})} 
                />
                {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}
            </div>

            {/* Email Field */}
            <div>
                <input 
                    style={{ width: '100%', padding: '8px' }}
                    value={values.email} 
                    type="email"
                    placeholder="Email" 
                    onChange={e => setValues({...values, email: e.target.value})} 
                />
                {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, backgroundColor: editingStudent ? '#f0ad4e' : '#28a745', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
                    {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
                
                {editingStudent && (
                    <button type="button" onClick={() => {setEditingStudent(null); setValues({name:'', email:'', roll_no:''}); setErrors({})}} style={{ padding: '10px' }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}