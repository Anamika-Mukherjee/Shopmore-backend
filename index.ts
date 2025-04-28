import "dotenv/config"; 
import express, {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from "@clerk/express";
import cors from "cors";
import productRoute from "./src/routes/products";
import categoryRoute from "./src/routes/categories";
import authRoute from "./src/routes/auth";
import adminRoutes from "./src/routes/admin";
import userRoutes from "./src/routes/user";

const app = express();
const port = process.env.PORT || 8000;

//initialize prisma client
const prisma = new PrismaClient();

//connect to prisma database
const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (err) {
    console.error('Prisma connection error:', err);
  }
};

connectToDatabase();

//define allowed urls for cors
const allowedUrls = [process.env.FRONTEND_URL];

//define cors options to allow requests from allowed urls listed above
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean)=> void) =>{
      if(allowedUrls.indexOf(origin) !== -1 || !origin){
          callback(null, true);
      }
      else{
          callback(new Error("Not allowed by CORS!"), false);
      }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

//execute cors and clerk middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(clerkMiddleware());

//middleware to use all api routes
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", authRoute);
app.use("/api", adminRoutes);
app.use("/api", userRoutes);

//display message in home route if server is running
app.get("/", async (req: Request, res: Response)=>{
  res.status(200).json("Server is live");
});

//listen to requests 
app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})