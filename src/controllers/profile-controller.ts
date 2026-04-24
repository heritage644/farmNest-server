import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import env from "dotenv"
import UserProfile from "../models/farmNestProfile.js";
import type{ AuthRequest } from "../middlewares/ussserMiddleware.js";
import type { get } from "node:http";

//@desc get user profile
//@routes GET /api/profile
//@access private

const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
     const userId = req.user.id; 
     console.log(userId); // Assuming you have authentication middleware that sets req.user
     const userProfile = await UserProfile.findOne({ userid: userId });

     if (!userProfile) {
          res.status(404);
          throw new Error("User profile not found");
     }

     res.json(userProfile);
});

//@desc update user profile
//@routes PUT /api/profile
//@access private
const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { profile } = req.body;

    const allowedFields = ["name"];
    const receivedFields = Object.keys(profile || {});

    const hasExtraFields = receivedFields.some(
      (field) => !allowedFields.includes(field)
    );

    if (hasExtraFields) {
      res.status(400).json({ message: "Invalid fields provided" });
      return;
    }

    if (!profile || !profile.name) {
      res.status(400);
      throw new Error("Name is required");
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userid: userId }, // 🔥 IMPORTANT (not _id)
      {
        $set: { "profile.name": profile.name },
        $setOnInsert: { userid: userId }, // only when creating
      },
      {
        returnDocument: "after",
        upsert: true, // 🔥 THIS creates if not found
      }
    );

    res.status(200).json(updatedProfile);
  }
);

//profile address 


const upsertUserAddress = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { addresses } = req.body; // 👈 single object now
     const allowedFields = ["label", "fullName", "addressLine", "city", "state", "phone", "isDefault", "_id"];
    const receivedFields = Object.keys(addresses || {});

    const hasExtraFields = receivedFields.some(
      (field) => !allowedFields.includes(field)
    );

    if (hasExtraFields) {
      res.status(400).json({ message: "Invalid fields provided" });
      return;
    }
   console.log("Received address:", addresses);
    if (!addresses) {
      res.status(400);
      throw new Error("Address is required");
    }

    const user = await UserProfile.findOne({ userid: userId });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    let existingAddress = null;

    // 🔍 check if address has _id (means update)
    if (addresses._id) {
      existingAddress = (user.addresses as any).id(addresses._id);

      if (!existingAddress) {
        res.status(404);
        throw new Error("Address not found");
      }
    }

    // ⭐ HANDLE DEFAULT
    if (addresses.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    if (existingAddress) {
      // ✏️ UPDATE
      Object.assign(existingAddress, addresses);
    } else {
      // ➕ CREATE
      user.addresses.push(addresses);
    }

    await user.save();

    res.status(200).json(user.addresses);
  }
);

// delete user profile
// routes api/delete/deleteProfile
const deleteUserProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;

  const deletedProfile = await UserProfile.findOneAndDelete({ userid: userId });
    res.json({ message: "User profile deleted successfully" });
})





const profileMethods ={
        getUserProfile,
        updateUserProfile,
        deleteUserProfile,
       upsertUserAddress
}
export default profileMethods