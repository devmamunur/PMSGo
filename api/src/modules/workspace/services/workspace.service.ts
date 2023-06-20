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
      throw new Error('Workspace create failed'+error.message);
    }
  }
}

export const workspaceService: WorkspaceService = new WorkspaceService();
