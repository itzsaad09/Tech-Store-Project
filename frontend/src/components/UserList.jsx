// src/components/UserList.js
import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Adjust this URL to match your backend API endpoint
                const response = await fetch('http://localhost:5000/api/user/display');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.users); // Assuming your backend sends { users: [...] }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
        return <div style={styles.container}>Loading users...</div>;
    }

    if (error) {
        return <div style={{ ...styles.container, ...styles.error }}>Error: {error}</div>;
    }

    if (users.length === 0) {
        return <div style={styles.container}>No users found.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User List</h2>
            <ul style={styles.list}>
                {users.map(user => (
                    <li key={user._id} style={styles.listItem}>
                        <p style={styles.userName}>Name: {user.fname || 'N/A'}</p>
                        <p style={styles.userLastName}>Last Name: {user.lname || 'N/A'}</p>
                        <p style={styles.userEmail}>Email: {user.email || 'N/A'}</p>
                        <p style={styles.userPassword}>Password: {user.password || 'N/A'}</p>
                        {/* Add more user properties as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '5px',
        margin: '10px 0',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    userName: {
        fontWeight: 'bold',
        color: '#555',
        margin: 0,
    },
    userEmail: {
        fontSize: '0.9em',
        color: '#777',
        margin: 0,
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    }
};

export default UserList;