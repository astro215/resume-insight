import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import router from './routes/routes.js';
import mongoose from 'mongoose'
import cors from 'cors'


const app = express();
const port = process.env.PORT;


// For localhost

// For MongoDB Atlas

// connectToMongoDB(atlasUri);


app.use(express.json());
app.use(cors());
app.use('/app',router);

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

