import {SignupInterface} from '../interfaces/auth.interface';
import {companyCreateRepository} from '../../company/repositories/company.repository';

class SignupRepository{
  async signup(reqBody : SignupInterface) : Promise<void>{
    await companyCreateRepository.create(reqBody);
  }
}
export const signupRepository :SignupRepository = new SignupRepository();
