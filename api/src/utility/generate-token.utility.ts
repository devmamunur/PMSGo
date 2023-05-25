import jwt from "jsonwebtoken";
import process from "process";

const generateTokenUtility = (payload : any) => {
    return  jwt.sign(payload, process.env.JWT_SECRET_KEY)
}
export default generateTokenUtility;