import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    description: string;
    price: number;
    Image: string;
    Category: string;
    stock: number;
    rating: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=productsSchema.d.ts.map