import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/farmNestUser.js"; // Adjust path as needed
const userValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1]; // get token from header
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user to request (req.user is now allowed because of AuthRequest)
            req.user = await User.findById(decoded.user.id).select("-password");
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
export { userValidateToken };
//# sourceMappingURL=ussserMiddleware.js.map