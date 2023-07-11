import {SigninInterface, SigninReturnInterface} from '../interfaces/auth.interface';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import generateTokenUtility from '../../../global/utility/generate-token.utility';
import {authService} from '../services/auth.service';

class SigninRepository {
  async signin(reqBody: SigninInterface): Promise<SigninReturnInterface> {
      reqBody.password = GeneratePasswordUtility(reqBody.password);
      let availableUser = [];
      availableUser = await this.checkIsAvailable(reqBody);

      if (availableUser.length === 1) {
        let userData = [];
        userData = await this.getUserData(reqBody);
        if(userData.length === 1){
          const token = generateTokenUtility(userData);
          const user = userData[0];
          user.accessToken = token;
          return user;
        }else{
          throw new Error('Login Failed');
        }
      }else {
        throw new Error('User Not Available');
      }
  }

  async checkIsAvailable(reqBody : SigninInterface){
    if(reqBody.type == 'company' || reqBody.type == 'admin'){
      return await authService.isCompanyAvailable(reqBody);
    }
  }

  async getUserData(reqBody : SigninInterface){
    if(reqBody.type == 'company' || reqBody.type == 'admin'){
      return  await authService.getCompanyDataForToken(reqBody);
    }
  }
}

export const signinRepository: SigninRepository = new SigninRepository();
