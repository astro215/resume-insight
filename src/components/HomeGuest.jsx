import React from "react";
import FeatureSection from "./FeatureSection.jsx";
import images from "../assets/index.js";


const HomeGuest = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'} mr-10 ml-10`}>
      {/* Main background and text color are switched based on dark mode */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Resume Insights
          </h1>
          <p className="text-lg mb-8">
            Easily select candidates based on skills and CGPA
          </p>
          <a href="/app/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection darkMode={darkMode} />

      {/* Selection and Storage Sections */}
      <section className={`container mx-auto px-4 py-16 ${darkMode ? 'bg-gray-900 ' : 'bg-white '}`}>
        <div className="flex flex-wrap items-center -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">
              Easily Select Candidates Based on Skills and CGPA
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Resume Insights is a platform that helps recruiters easily select candidates based on their skills and CGPA. Our advanced resume parser accurately extracts information from resumes in various formats and classifies them into distinct sections such as education, work experience, and skills.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <img
              src={images.img_1}
              alt="Resume Insights"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex flex-wrap items-center -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <img
              src={images.img_3}
              alt="Resume Insights for Recruiters"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <h2 className="text-3xl font-bold mb-2">
              Recruiters Can Easily View and Sort Resumes
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Recruiters can view and sort resumes based on skills and CGPA, making it easy to find the best candidates for the job. Our platform saves users' resumes, so recruiters can access them at any time.
            </p>
          </div>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex flex-wrap items-center -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">
              Advanced Resume Parsing
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our advanced resume parser accurately extracts information from resumes in various formats and classifies them into distinct sections such as education, work experience, and skills. This makes it easy for recruiters to quickly scan resumes and find the information they need.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <img
              src={images.img_2}
              alt="Advanced Resume Parsing"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeGuest;
