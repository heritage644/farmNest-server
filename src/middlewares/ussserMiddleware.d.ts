import type { Request } from "express";
export interface AuthRequest extends Request {
    user?: any;
}
declare const userValidateToken: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export { userValidateToken };
//# sourceMappingURL=ussserMiddleware.d.ts.map