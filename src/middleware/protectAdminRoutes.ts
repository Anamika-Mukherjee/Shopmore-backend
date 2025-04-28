//middleware to protect admin routes
import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";

export const protectAdminRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get user id from clerk
    const { userId } = getAuth(req);

    //if user id not retrieved send "unauthorized" message
    if (!userId) {
         res.status(401).json({ message: "Unauthorized" });
         return;
    }

    //fetch user role from clerk
    const user = await clerkClient.users.getUser(userId);
    const role = user.publicMetadata?.role;

    //return with error message if user is not "ADMIN"
    if (role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }
    
    //proceed to execute further processes if user is "ADMIN"
    next(); 
  } 
  catch (error) {
    console.error("Admin check failed:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
