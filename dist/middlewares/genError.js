import { NOT_FOUND, FORBIDDEN, VALIDATION_ERROR, UNAUTHORIZED } from "../constants.js";
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let title;
    switch (statusCode) {
        case VALIDATION_ERROR:
            title = "Validation Error";
            break;
        case UNAUTHORIZED:
            title = "Unauthorized";
            break;
        case FORBIDDEN:
            title = "Forbidden";
            break;
        case NOT_FOUND:
            title = "Not Found";
            break;
        default:
            title = "Server Error";
            break;
    }
    res.status(statusCode).json({
        title,
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
export default errorHandler;
//# sourceMappingURL=genError.js.map