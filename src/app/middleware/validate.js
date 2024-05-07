import { responseError } from "@/utils/helpers/response.helpers";
import { validateAsync } from "@/utils/helpers/validate.helper";

export function validate(schema) {
    return async function (req, res, next) {
        const field = req.method === "GET" ? "query" : "body";
        console.log(req.body); 
        const [value, error] = await validateAsync(schema, req[field], req);
        
        if (Object.keys(error).length > 0) {
            return responseError(res, error ,400, "Validation Error");
        }

        req[field] = value;
        return next();
    };
}
