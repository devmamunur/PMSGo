import CompanyModel from "../../company/models/company.model";
import GeneratePasswordUtility from "../../../global/utility/generate-password.utility";
import {SignupInterface} from "../interfaces/signup.interface";

class SignupRepository{
  static async signup(reqBody : SignupInterface){
      reqBody.password = GeneratePasswordUtility(reqBody.password);
      return await CompanyModel.create(reqBody);
  }
}
export default SignupRepository;
