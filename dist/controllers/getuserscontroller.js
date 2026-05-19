import asyncHandler from "express-async-handler";
const getDashboardUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(req.user);
    console.log(req.user);
});
const getAllUsers = {
    getDashboardUser
};
export default getAllUsers;
//# sourceMappingURL=getuserscontroller.js.map