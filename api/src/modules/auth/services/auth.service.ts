import {CompanyDataForToken, SigninInterface} from '../interfaces/auth.interface';
import CompanyModel from '../../company/models/company.model';

class AuthService{
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
      throw new Error('Company not available: '+error.message);
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
export const authService : AuthService = new AuthService();
