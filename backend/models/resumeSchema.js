import mongoose from 'mongoose';


const resumeSchema_ = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
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
            properties: {
              education: {
                type: Array,
                items: [
                  {
                    type: Object,
                    properties: {
                      university: {
                        type: String,
                      },
                      CGPA: {
                        type: String,
                      },
                    },
                    required: ["university", "CGPA"],
                  },
                ],
              },
              work: {
                type: Array,
                items: [
                  {
                    type: Object,
                    properties: {
                      organization: {
                        type: String,
                      },
                      location: {
                        type: String,
                      },
                      position: {
                        type: String,
                      },
                      duration: {
                        type: String,
                      },
                      standardized_job_title: {
                        type: String,
                      },
                      predicted_skills: {
                        type: Array,
                        items: {
                          type: String,
                        },
                      },
                    },
                    required: [
                      "organization",
                      "location",
                      "position",
                      "duration",
                      "standardized_job_title",
                      "predicted_skills",
                    ],
                  },
                ],
              },
              projects: {
                type: Array,
                items: [
                  {
                    type: Object,
                    properties: {
                      project_name: {
                        type: String,
                      },
                      start_date: {
                        type: String,
                      },
                      end_date: {
                        type: String,
                      },
                      description: {
                        type: String,
                      },
                      predicted_skills: {
                        type: Array,
                        items: {
                          type: String,
                        },
                      },
                    },
                    required: [
                      "project_name",
                      "start_date",
                      "end_date",
                      "description",
                      "predicted_skills",
                    ],
                  },
                ],
              },
              skills: {
                type: Object,
                properties: {
                  technical: {
                    type: Array,
                    items: {
                      type: String,
                    },
                  },
                  non_technical: {
                    type: Array,
                    items: {
                      type: String,
                    },
                  },
                },
                required: ["technical", "non_technical"],
              },
              career_trajectory: {
                type: String,
              },
            },
            required: [
              "education",
              "work",
              "projects",
              "skills",
              "career_trajectory",
            ],
          },
        },
      ],
    },
  },
  {
    collection: "users", // Specify your custom collection name here
  }
);



const resumeSchema = mongoose.model("user_", resumeSchema_);

export default resumeSchema;