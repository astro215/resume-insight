import React, { useState, useEffect } from "react";
import axios from "axios";
import UserResume from "./UserResume";

const AdminHome = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/app/admin/home");
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFilter = async () => {
    let filtered = [];
    for (const user of users) {
      const response = await axios.get(`http://localhost:4000/app/user/${user.uid}/resume/latest`);
      const resume = response.data.parsed_resume;

      let passSkills = !skillsFilter || skillsFilter.split(',').every(skill =>
        resume.skills?.TechnicalSkills?.includes(skill.trim()) ||
        resume.skills?.NonTechnicalSkills?.includes(skill.trim())
      );

      let passCgpa = !cgpaFilter || resume.education.some(edu =>
        parseFloat(edu.CGPA) >= parseFloat(cgpaFilter)
      );

      if (passSkills && passCgpa) {
        filtered.push(user);
      }
    }
    setFilteredUsers(filtered);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseResume = () => {
    setSelectedUserId(null);
  };

  return (
    <div className={`container p-4 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`}>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Filter by skills"
          value={skillsFilter}
          onChange={(e) => setSkillsFilter(e.target.value)}
          className={`input-field mr-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        />
        <input
          type="number"
          placeholder="Filter by CGPA"
          value={cgpaFilter}
          onChange={(e) => setCgpaFilter(e.target.value)}
          className={`input-field mr-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        />
        <button onClick={handleFilter} className={`btn ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'}`}>
          Apply Filters
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {selectedUserId ? (
          <li key={selectedUserId} className="user-item">
            <div className="p-4">
              <p className="text-lg font-semibold">Name: {filteredUsers.find((user) => user.uid === selectedUserId).name}</p>
              <p>Email: {filteredUsers.find((user) => user.uid === selectedUserId).email}</p>
            </div>
          </li>
        ) : (
          filteredUsers.map((user) => (
            <li
              key={user.uid}
              className="user-item cursor-pointer"
              onClick={() => handleUserClick(user.uid)}
            >
              <div className={`p-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-lg font-semibold">Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            </li>
          ))
        )}
      </ul>
      {selectedUserId && <UserResume userId={selectedUserId} onClose={handleCloseResume} darkMode={darkMode}/>}
    </div>
  );
};

export default AdminHome;
