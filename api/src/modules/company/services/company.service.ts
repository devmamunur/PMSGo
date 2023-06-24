import {SignupInterface} from '../../auth/interfaces/auth.interface';
import {Types} from 'mongoose';
import CompanyModel from '../models/company.model';

class CompanyService{
  async createCompanyGetId(reqBody: SignupInterface, defaultPlanId: Types.ObjectId) {
    try {
      const createdCompany = await CompanyModel.create({
        name: reqBody.name,
        email: reqBody.email,
        password: reqBody.password,
        plan: defaultPlanId,
      });
      return createdCompany._id;
    } catch (error) {
      throw new Error('Company create failed: '+error.message);
    }
  }
  async setCompanyCurrantWorkspace(companyId : Types.ObjectId, workspaceId : Types.ObjectId){
    const updatedUser = await CompanyModel.findByIdAndUpdate(companyId,
      {$set: { currant_workspace: workspaceId }},
      {new: true}
    );
    if(!updatedUser){
      throw new Error('User plan update failed');
    }
  }
}
export const companyService : CompanyService = new CompanyService();
