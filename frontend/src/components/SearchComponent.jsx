import React from 'react';
    
// We take 'onSearch' as a prop from the parent
export default function SearchComponent({ onSearch }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <h2>Search for any particular student details</h2>
            <input 
                type="text" 
                placeholder="Search by name or roll no..." 
                onChange={(e) => onSearch(e.target.value)}
                style={{ 
                    padding: '12px', 
                    width: '100%', 
                    borderRadius: '8px', 
                    border: '1px solid #ccc',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
}   