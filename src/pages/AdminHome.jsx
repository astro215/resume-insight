import React, { useState, useEffect } from "react";
import axios from "axios";
import UserResume from "./UserResume";

const AdminHome = () => {
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
    try {
      const response = await axios.post(
        "http://localhost:4000/app/admin/filter",
        {
          skills: skillsFilter,
          cgpa: cgpaFilter,
        }
      );
      setFilteredUsers(response.data.filteredUsers);
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseResume = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Filter by skills"
          value={skillsFilter}
          onChange={(e) => setSkillsFilter(e.target.value)}
          className="input-field mr-4"
        />
        <input
          type="number"
          placeholder="Filter by CGPA"
          value={cgpaFilter}
          onChange={(e) => setCgpaFilter(e.target.value)}
          className="input-field mr-4"
        />
        <button onClick={handleFilter} className="btn-blue">
          Apply Filters
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">User List</h3>
        <ul className="divide-y divide-gray-200">
          {selectedUserId ? (
            <li key={selectedUserId} className="user-item">
              <div className="p-4">
                <p className="text-lg font-semibold">
                  Name: {filteredUsers.find(user => user.uid === selectedUserId).name}
                </p>
                <p className="text-gray-600">
                  Email: {filteredUsers.find(user => user.uid === selectedUserId).email}
                </p>
              </div>
            </li>
          ) : (
            filteredUsers.map((user, index) => (
              <li
                key={index}
                className="user-item cursor-pointer"
                onClick={() => handleUserClick(user.uid)}
              >
                <div className="p-4 hover:bg-gray-50">
                  <p className="text-lg font-semibold">Name: {user.name}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {selectedUserId && (
        <UserResume userId={selectedUserId} onClose={handleCloseResume} />
      )}
    </div>
  );
};

export default AdminHome;
