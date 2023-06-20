import {Types} from 'mongoose';
import PlanModel from '../models/plan.model';

class PlanService{
  async getDefaultPlan(): Promise<Types.ObjectId> {
    const getPlan = await PlanModel.findOne({is_default: 1}, '_id');
    if (!getPlan) {
      throw new Error('Default plan not found');
    }
    return getPlan._id;
  }
}
export const planService : PlanService = new PlanService();

