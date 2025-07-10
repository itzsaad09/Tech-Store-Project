import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('userToken');

                if (!token) {
                    setError("Authentication token not found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${backendUrl}/api/user/display`)

                if (response.data || response.data.success) {
                    setUserData(response.data); 
                } else {
                    setError(response.data.message || "Failed to fetch user data.");
                }

            } catch (err) {
                console.error("Error fetching user profile:", err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data.message || "An error occurred during API call.");
                } else {
                    setError(err.message || "Failed to load profile. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="profile-container">Loading profile...</div>;
    }

    if (error) {
        return <div className="profile-container error-message">{error}</div>;
    }

    if (!userData) {
        return <div className="profile-container">User data not available.</div>;
    }

    const { fname, lname, email, shippingDetails } = userData.users[0];

    return (
        <div className="profile-container">
            <h1>User Profile</h1>

            <div className="profile-section">
                <h2>Personal Details</h2>
                <p><strong>First Name:</strong> {fname || 'Not provided'}</p>
                <p><strong>Last Name:</strong> {lname || 'Not provided'}</p>
                <p><strong>Email:</strong> {email || 'Not provided'}</p>
            </div>

            <div className="profile-section">
                <h2>Shipping Details</h2>
                {shippingDetails ? (
                    <>
                        <p><strong>Full Name:</strong> {shippingDetails.fullName || 'Not provided'}</p>
                        <p><strong>Address Line 1:</strong> {shippingDetails.addressLine1 || 'Not provided'}</p>
                        {/* Only render Address Line 2 if it exists */}
                        {shippingDetails.addressLine2 && <p><strong>Address Line 2:</strong> {shippingDetails.addressLine2}</p>}
                        <p><strong>City:</strong> {shippingDetails.city || 'Not provided'}</p>
                        <p><strong>State/Province:</strong> {shippingDetails.stateProvince || 'Not provided'}</p>
                        <p><strong>Postal Code:</strong> {shippingDetails.postalCode || 'Not provided'}</p>
                        <p><strong>Country:</strong> {shippingDetails.country || 'Not provided'}</p>
                        <p><strong>Phone Number:</strong> {shippingDetails.phoneNumber || 'Not provided'}</p>
                        <p><strong>Shipping Method:</strong> {shippingDetails.shippingMethod || 'Not provided'}</p>
                    </>
                ) : (
                    <p>No shipping details found.</p>
                )}
            </div>
        </div>
    );
}

export default MyProfile;