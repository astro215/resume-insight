import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import path from "path";

const HomeLoggedIn = () => {
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Function to fetch uploaded files on component mount
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

  // Function to handle file download
  const handleFileDownload = async (filePath) => {
    try {
      console.log(filePath);

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setIsLoading(true); // Start loading
      await axios.post("http://localhost:4000/app/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadMessage("File uploaded successfully!");
      setIsLoading(false); // Stop loading after upload success
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Error uploading file.");
      setIsLoading(false); // Stop loading after upload error
    }
  };

  return (
    <div className="flex flex-row">
      <div className="home-logged-in bg-gray-100 p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Welcome to Resume Revealer</h1>
        <p className="text-lg mb-4">Upload your Resume</p>
        <div id="fileUpload" className="max-w-md">
          <div className="mb-2">
            <Label
              htmlFor="file"
              value="Upload file"
              className="block text-lg font-semibold"
            />
          </div>
          <FileInput id="file" className="w-full" onChange={handleFileUpload} />
          {isLoading && ( // Show spinner if loading
            <div className="border border-t-4 border-gray-200 h-12 w-12 mx-auto mt-4 rounded-full animate-spin"></div>
          )}
        </div>
        {uploadMessage && !isLoading && <p>{uploadMessage}</p>}
      </div>
      <div className="uploaded-files bg-gray-200 p-8 flex-grow-0">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        {uploadedFiles.map((filePath, index) => (
          <div key={index} className="flex flex-row items-center mb-2">
            <p className="mr-2">{filePath.split("/").pop()}</p>{" "}
            {/* Display file name instead of full path */}
            <button
              onClick={() => handleFileDownload(filePath)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLoggedIn;
