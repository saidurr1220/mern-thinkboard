import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';


dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

//middleware to parse JSON
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));  
app.use(express.json()); // this will parse incoming JSON requests
app.use(rateLimiter);

//simple logger middleware

// app.use((req, res, next) => {
//   console.log(`Req Method: ${req.method}, Req URL: ${req.url}`);
//   next();
// });
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});
 
