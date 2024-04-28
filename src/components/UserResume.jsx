import React, { useState, useEffect } from "react";
import axios from "axios";

const UserResume = ({ userId, onClose, darkMode }) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, [userId]); // Ensure dependency on userId for correct updates

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/app/user/${userId}/resume/latest`
      );
      setResume(response.data.parsed_resume);
    } catch (error) {
      console.error("Error fetching user resume:", error);
    }
  };


  

  return (
    <div className={`max-w-4xl mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded shadow-lg relative`}>
      <button
        onClick={onClose}
        className={`absolute top-0 right-0 m-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
      >
        Close
      </button>
      {resume ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <ul className="mb-6 pb-4">
            {resume.education.map((edu, index) => (
              <li key={index} className={`mb-2 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                <span className="font-semibold">{edu.university}</span> - CGPA: {edu.CGPA}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          <ul>
            {resume.work.map((exp, index) => (
              <li key={index} className={`mb-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'} pb-4`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.organization}, {exp.location}
                    </p>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.duration}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          <ul>
            {resume.projects.map((project, index) => (
              <li key={index} className={`mb-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'} pb-4`}>
                <h4 className="font-semibold">{project.project_name}</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{project.description}</p>
                <p className="mt-2 font-semibold">Skills: {project.predicted_skills.join(", ")}</p>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
          <div className="grid grid-cols-3 gap-2 mb-6 pb-4">
            {resume.skills["Technical Skills"].map((skill, index) => (
              <div key={index} className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} border p-2 rounded`}>
                {skill}
              </div>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-4">Non Technical Skills</h3>
          <div className="grid grid-cols-3 gap-2 mb-6 pb-4">
            {resume.skills["Non Technical Skills"].map((skill, index) => (
              <div key={index} className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} border p-2 rounded`}>
                {skill}
              </div>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
          <div className="grid grid-cols-3 gap-2 mb-6 pb-4">
            {resume.techstack.map((tech, index) => (
              <div key={index} className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} border p-2 rounded`}>
                {tech}
              </div>
            ))}
          </div>
          <p className={`font-semibold ${darkMode ? 'border-gray-700' : 'border-gray-300'} pb-4`}>
            Career Trajectory: {resume.career_trajectory}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserResume;
