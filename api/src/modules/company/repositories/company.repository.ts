import {SignupInterface} from '../../auth/interfaces/auth.interface';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import {planService} from '../../plan/services/plan.service';
import {companyService} from '../services/company.service';
import {workspaceService} from '../../workspace/services/workspace.service';

class CompanyRepository {
  async create(reqBody: SignupInterface) {
    reqBody.password = GeneratePasswordUtility(reqBody.password);
    const defaultPlanId = await planService.getDefaultPlan();
    const companyId = await companyService.createCompanyGetId(reqBody, defaultPlanId);
    const workspaceId = await workspaceService.createWorkspaceGetId(companyId, reqBody.workspace_name);
    await companyService.setCompanyCurrantWorkspace(companyId, workspaceId);
  }
}

export const companyCreateRepository: CompanyRepository = new CompanyRepository();
