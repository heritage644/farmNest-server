
import mongoose, { Schema, Document } from "mongoose";
  

export interface IUser extends Document {
  userid:string
  password: string;

  profile: {
    name: string;
    
  };

  addresses: {
    label: string; // e.g. "Home", "Office"
    addressLine: string;
    city: string;
    state: string;
    phone: string;
    isDefault: boolean;
  }[];

  storeCredit: number;

  preferences: {
    newsletter: boolean;
  };
}

const userProfileSchema = new Schema<IUser>(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // never return password by default
    },

    profile: {
      name: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "+234 **********",
      },
    },

    addresses: [
      {
        label: { type: String, default: "Home" },
        fullName: String,
        addressLine: String,
        city: String,
        state: String,
        phone: String,
        isDefault: { type: Boolean, default: false },
      },
    ],

    storeCredit: {
      type: Number,
      default: 0,
    },

    preferences: {
      newsletter: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile  = mongoose.model<IUser>("UserProfile", userProfileSchema);
export default UserProfile 
