import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    userid: string;
    password: string;
    profile: {
        name: string;
    };
    addresses: {
        label: string;
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
declare const UserProfile: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default UserProfile;
//# sourceMappingURL=farmNestProfile.d.ts.map