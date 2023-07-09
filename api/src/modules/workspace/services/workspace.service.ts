import WorkspaceModel from '../models/workspace.model';
import {Types} from 'mongoose';
import generateSlug from '../../../global/utility/generate.slug.utility';

class WorkspaceService {
  async createWorkspaceGetId(companyId: Types.ObjectId, name: string): Promise<Types.ObjectId> {
    try {

      const createdWorkspace = await WorkspaceModel.create({
        created_by: companyId,
        name: name,
        slug : generateSlug(name),
        currency_code : 'USD'
      });
      return createdWorkspace._id;
    } catch (error) {
      throw new Error('Workspace create failed '+error.message);
    }
  }

  async getFirstWorkspaceByCompany(company : string) : Promise<Types.ObjectId> {
      const workspace = await WorkspaceModel.findOne({created_by : company}, '_id').sort({ _id: 1 }).exec();
      if(!workspace) {
        throw new Error('Workspace get failed');
      }
    return workspace._id;
  }
}

export const workspaceService: WorkspaceService = new WorkspaceService();
