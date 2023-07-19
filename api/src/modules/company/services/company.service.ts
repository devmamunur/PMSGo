import {SignupInterface} from '../../auth/interfaces/auth.interface';
import {Types} from 'mongoose';
import CompanyModel from '../models/company.model';
import {Request} from 'express';

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

  async getCompanyCurrantWorkspaceId(req : Request) : Promise<Types.ObjectId>{
    const userId = req.currentUser._id;
    const company = await CompanyModel.aggregate(
      [
        {
          $match: {
            _id: new Types.ObjectId(userId),
          },
        },
        {
          $project : {
            currant_workspace : 1,
          }
        }
      ]
    );
    if(company && company.length > 0){
      return company[0].currant_workspace;
    }else {
      throw new Error('Company default workspace not available');
    }
  }
}
export const companyService : CompanyService = new CompanyService();
