import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulated logged-in user
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser(savedUser);
    } else {
      const mockUser = {
        fullName: "Ashmeet Kaur",
        email: "ashmeetkaurashu2006@gmail.com",
        role: "Frontend Developer",
        joined: "February 2026",
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      <div className="profile-card">
        <h2>{user.name}</h2>
        <p className="role">{user.role}</p>
        <p>📧 {user.email}</p>
        <p>📅 Joined: {user.joined}</p>
      </div>
    </div>
  );
};

export default Profile;
