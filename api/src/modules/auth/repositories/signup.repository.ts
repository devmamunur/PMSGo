import CompanyModel from '../../company/models/company.model';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import {SignupInterface} from '../interfaces/auth.interface';
import {ServerError} from '../../../global/utility/error.handler.utility';

class SignupRepository{
  async signup(reqBody : SignupInterface) : Promise<void>{
    try{
      reqBody.password = GeneratePasswordUtility(reqBody.password);
      await CompanyModel.create(reqBody);
    }catch (error){
      throw new ServerError('Failed to create company');
    }
  }
}
export const signupRepository :SignupRepository = new SignupRepository();
