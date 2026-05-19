import mongoose, { Schema, Document } from "mongoose";
const userProfileSchema = new Schema({
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
}, {
    timestamps: true,
});
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
//# sourceMappingURL=farmNestProfile.js.map