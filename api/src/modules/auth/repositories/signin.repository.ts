import {CompanyDataForToken, SigninInterface, SigninReturnInterface} from '../interfaces/auth.interface';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import CompanyModel from '../../company/models/company.model';
import generateTokenUtility from '../../../global/utility/generate-token.utility';

class SigninRepository {
  async signin(reqBody: SigninInterface): Promise<SigninReturnInterface> {

      reqBody.password = GeneratePasswordUtility(reqBody.password);
      let availableUser = [];
      if(reqBody.type == 'company' || reqBody.type == 'admin'){
        availableUser = await this.isCompanyAvailable(reqBody);
      }
      if (availableUser.length === 1) {
        let userData = [];
        if(reqBody.type == 'company' || reqBody.type == 'admin'){
          userData = await this.getCompanyDataForToken(reqBody);
        }
        if(userData.length === 1){
          const payload = { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userData};
          const token = generateTokenUtility(payload);
          return { token: token, data: userData[0] };
        }else{
          throw new Error('Login Failed');
        }
      }else {
        throw new Error('User Not Available');
      }
  }
  async isCompanyAvailable(reqBody: SigninInterface): Promise<SigninInterface[]> {
    try {
      return CompanyModel.aggregate([
        {$match: reqBody},
        {
          $project: {
            email: 1,
            password: 1,
          },
        },
      ]);
    }catch (error){
      throw new Error('Login Failed');
    }
  }
  async getCompanyDataForToken(reqBody: SigninInterface) : Promise<CompanyDataForToken[]> {
    try{
      return CompanyModel.aggregate([
        {$match: reqBody},
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            type: 1
          }
        }
      ]);
    }catch (error){
      throw new Error('Login Failed');
    }
  }
}

export const signinRepository: SigninRepository = new SigninRepository();
