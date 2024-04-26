import express from "express";
import jsonSchema from "../models/jsonSchema.js";
import resumeSchema from "../models/resumeSchema.js";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Import signInWithEmailAndPassword
import auth from "../config.js";
import dotenv from "dotenv";
import AdminUser from "../models/adminSchema.js";
import { useId } from "react";
dotenv.config();

var router = express.Router();
let uid = null; // Define uid globally

/* The code snippet you provided is defining a POST route at '/signup' in an Express router. When a
  POST request is made to this route, it expects the request body to contain 'email' and 'uid' fields. */
// const User =  jsonSchema// Changed User to Resume

router.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Firebase Auth:", auth);

  const { email, password, name } = req.body; // Assuming password is included in the request body

  try {
    if (!email || !password || !name) {
      throw new Error("Email, name , and password are required");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up successfully");
        // Signed up successfully
        const user = auth.currentUser;
        console.log("User:", user.uid);
        const uid = user.uid;

        // console.log('User:', user);
        // Now, you might want to save other user data to your database
        // Assuming `Resume.create()` is the function to save user data
        return jsonSchema.create({ email, uid, name }); // Assuming this returns a promise
      })
      .then((data) => {
        // Send the saved data as a response
        console.log("Saved data:", data);
        res.status(200).json(data);
      })
      .catch((error) => {
        // Handle error from Firebase authentication
        console.log("Error signing up:", error.message);
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    console.log("Error signing up:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Sign in user with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Signed in successfully");
        // Get the signed-in user
        const user = userCredential.user;
        uid = auth.currentUser.uid;

        // Check if the signed-in user is an admin
        const isAdmin = await isAdminUser(email); // Assuming a function to check admin status

        // Include is_Admin field in the response
        res
          .status(200)
          .json({ message: "Signed in successfully", uid, is_Admin: isAdmin });
      })
      .catch((error) => {
        console.log("Error signing in:", error.message);
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    console.log("Error signing in:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Function to check if a user is an admin
async function isAdminUser(email) {
  // Query the admin collection to check if the provided email exists
  const admin = await AdminUser.findOne({ email });
  return admin !== null;
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/update", upload.single("resume"), async (req, res) => {
  try {
    // Send the uploaded resume to FastAPI
    const formData = new FormData();
    formData.append("files", fs.createReadStream(req.file.path));

    const fastApiResponse = await axios.post(
      process.env.FASTAPI_URL,
      formData,
      {
        // Set headers for the form data
        headers: {
          "Content-Type": "multipart/form-data", // Set Content-Type manually
          ...formData.getHeaders(), // Include form data headers
        },
      }
    );

    // Extract parsed resumes from FastAPI response
    const parsedResumes = fastApiResponse.data;

    if (!parsedResumes || parsedResumes.length === 0) {
      return res
        .status(500)
        .json({ error: "No parsed resumes found in FastAPI response" });
    }

    // Update or create the resume for the user with the given UID
    let user = await jsonSchema.findOne({ uid: uid });
    console.log("User:", user);

    if (!user) {
      // If the user does not exist, create a new user
      user = new jsonSchema({
        uid: global.uid,
        resumes: [],
        uploaded_files: [],
      });
    }

    // Loop through each parsed resume
    for (const parsedResume of parsedResumes) {
      const { file_name, parsed_resume, parsed_json_resume } = parsedResume;

      // Check if a resume with the same file_name exists
      const existingResumeIndex = user.resumes.findIndex(
        (resume) => resume.file_name === file_name
      );

      if (existingResumeIndex !== -1) {
        // If a resume with the same file_name exists, update it
        user.resumes[existingResumeIndex] = {
          file_name: file_name,
          parsed_resume: parsed_resume,
          parsed_json_resume: parsed_json_resume,
        };
      } else {
        // If no resume with the same file_name exists, create a new entry
        console.log("creating new resume");
        user.resumes.push({
          file_name: file_name,
          parsed_resume: parsed_resume,
          parsed_json_resume: parsed_json_resume,
        });
      }

      // Update or create the uploaded file entry
      user.uploaded_files.push({
        file_name: file_name,
        file: fs.readFileSync(req.file.path),
      });
    }

    await user.save();

    res.status(200).json({ message: "Resume updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signout", async (req, res) => {
  try {
    // Sign out the user
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        // Send response indicating successful sign-out
        res.status(200).json({ message: "Signed out successfully" });
      })
      .catch((error) => {
        // Handle sign-out error
        console.error("Error signing out:", error.message);
        res.status(500).json({ error: "Error signing out" });
      });
  } catch (error) {
    // Handle any other errors
    console.error("Error signing out:", error.message);
    res.status(500).json({ error: "Error signing out" });
  }
});

const uploadDir = path.join(
  "C:/Users/jaini/Desktop/FS Project/resume-revealer/backend/",
  "file_uploads"
);

router.get("/uploads", async (req, res) => {
  try {
    // Find the user based on the provided uid
    const user = await jsonSchema.findOne({ uid: uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a directory named "file_uploads" if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure that parent directories are created if they don't exist
      } catch (error) {
        console.error("Error creating directory:", error);
        throw new Error("Failed to create directory");
      }
    }

    // Array to store file paths
    const fileNames = [];

    // Iterate through each uploaded file and save it to disk
    for (const file of user.uploaded_files) {
      if (!file.file) {
        throw new Error("File data not found");
      }

      const fileName = file.file_name;
      const fileData = file.file;

      // Create file path
      const filePath = path.join(uploadDir, fileName);
      fileNames.push(fileName);

      // Write file data to disk
      fs.writeFileSync(filePath, fileData);
    }

    // Send file paths to frontend
    res.status(200).json({ fileNames: fileNames });
  } catch (error) {
    console.error("Error fetching upload data:", error); // Log the error message and stack trace
    res.status(500).json({ error: "Error fetching upload data" });
  }
});

router.get("/download/:fileName", (req, res) => {
  const filename = req.params.fileName;
  const filePath = path.join(uploadDir, filename);

  console.log(filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    // Send file as a blob
    const fileBlob = Buffer.from(data, "binary");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(fileBlob);
  });
});

router.post("/admin/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create admin user in Firebase Auth
    await createUserWithEmailAndPassword(auth, email, password);

    // Save admin email to admin collection
    await AdminUser.create({ email });

    res.status(200).json({ message: "Admin signed up successfully" });
  } catch (error) {
    console.error("Error signing up admin:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route for AdminHome
router.get("/admin/home", async (req, res) => {
  try {
    // Implement logic to fetch user data and render AdminHome
    // Fetch user data from the database
    const users = await jsonSchema.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});



const getLatestParsedResume = async (useId) => {
  try {
    const user = await jsonSchema.findOne({ uid: useId });

    console.log("User:", user);
    if (!user) {
      return null; // User not found
    }
    // Sort resumes by 'created_on' in descending order and get the first one
    const latestResume = user.resumes.sort(
      (a, b) => b.created_on - a.created_on
    )[0];
    if (!latestResume) {
      return null; // No resumes found for the user
    }
    return latestResume.parsed_json_resume;
  } catch (error) {
    console.error(
      `Error fetching latest parsed resume for user ${userId}:`,
      error
    );
    return null;
  }
};

// Route to fetch the latest parsed resume for a user
router.get("/user/:uid/resume/latest", async (req, res) => {
  const { uid } = req.params;
  console.log("UID:", uid);
  try {
    const latestParsedResume = await getLatestParsedResume(uid);
    if (!latestParsedResume) {
      return res
        .status(404)
        .json({ error: "Latest parsed resume not found for the user" });
    }
    res.json({ parsed_resume: latestParsedResume });
  } catch (error) {
    console.error("Error fetching latest parsed resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/resume/delete/:fileName", async (req, res) => {
  const { fileName } = req.params; // Extract file name from request parameters

  try {
    // Find the user based on the provided UID
    const user = await jsonSchema.findOne({ uid: uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the resume with the specified file name
    const resumeIndex = user.resumes.findIndex(
      (resume) => resume.file_name === fileName
    );

    if (resumeIndex === -1) {
      return res.status(404).json({ error: "Resume not found for the user" });
    }

    // Remove the resume from the user's resumes array
    user.resumes.splice(resumeIndex, 1);

    // Remove the uploaded file entry associated with the resume
    const uploadedFileIndex = user.uploaded_files.findIndex(
      (file) => file.file_name === fileName
    );

    if (uploadedFileIndex !== -1) {
      // If the uploaded file entry exists, remove it
      user.uploaded_files.splice(uploadedFileIndex, 1);
    }

    // Save the updated user data
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Error deleting resume" });
  }
});

// Route for filtering users based on skills and CGPA



export default router;
