import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    uploaded_files: {
      type: [
        {
          file_name: {
            type: String,
            required: true,
          },
          file: {
            type: Buffer,
            required: true,
          },
        },
      ],
    },
    resumes: {
      type: [
        {
          file_name: {
            type: String,
            required: true,
          },
          parsed_resume: {
            type: String,
            required: true,
          },
          parsed_json_resume: {
            type: Object,
            required: true,
          },
          created_on : {
            type: Date,
            default: Date.now,
          },
        },
      ],  
    },
  },
  {
    collection: "users", // Specify your custom collection name here
  }
);

const jsonSchema = mongoose.model("user", resumeSchema);

export default jsonSchema;
