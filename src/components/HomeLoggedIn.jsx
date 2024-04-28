import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import UserDisplayResume from "./UserDisplayResume";

const HomeLoggedIn = ({ darkMode , email}) => {
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null); // To store the currently selected file name

  const handleViewResume = (fileName) => {
    setSelectedFileName(fileName); // Set the selected file
  };

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/app/uploads");
        setUploadedFiles(response.data.fileNames);
        console.log(response.data.fileNames);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploadedFiles();
  }, []);

  const handleFileDownload = async (filePath) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/app/download/${encodeURIComponent(filePath)}`,
        {
          responseType: "blob",
        }
      );


  

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filePath.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleFileDelete = async (fileName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`http://localhost:4000/app/resume/delete/${encodeURIComponent(fileName)}`);
        setUploadedFiles(uploadedFiles.filter(file => file !== fileName));
        console.log(res);
        alert(res.data.message)
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setIsLoading(true);
      await axios.post("http://localhost:4000/app/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadMessage("File uploaded successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Error uploading file.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Welcome to Resume Revealer</h1>
        <div id="fileUpload" className="max-w-md">
          <Label htmlFor="file" value="Upload your resume" className={`block text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          <FileInput id="file" className="w-full" onChange={handleFileUpload} />
          {isLoading && (
            <div className="border border-t-4 border-gray-200 h-12 w-12 mx-auto mt-4 rounded-full animate-spin"></div>
          )}
          {uploadMessage && !isLoading && <p>{uploadMessage}</p>}
        </div>
      </div>
      <div className="uploaded-files mb-4">
        <h2 className="text-2xl font-bold">Uploaded Files</h2>
        {uploadedFiles.map((filePath, index) => (
          <div key={index} className="flex items-center mb-2">
            <p className="mr-2">{filePath.split("/").pop()}</p>
            <button onClick={() => handleFileDownload(filePath)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Download
            </button>
            <button onClick={() => handleFileDelete(filePath)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              Delete
            </button>
            <button onClick={() => handleViewResume(filePath)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </div>
        ))}
      </div>
      {selectedFileName && (
        <UserDisplayResume email={email} fileName={selectedFileName} onClose={() => setSelectedFileName(null)} darkMode={darkMode} />
      )}
    </div>
  );
};

export default HomeLoggedIn;