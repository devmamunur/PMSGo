import mongoose from 'mongoose';
import { envConfig } from '../../config/env.config';
import CompanyModel from '../../../modules/company/models/company.model';
import GeneratePasswordUtility from '../../utility/generate-password.utility';
import PlanModel from '../../../modules/plan/models/plan.model';

async function seedAdmin(): Promise<void> {
  try {
    const existingAdmin = await CompanyModel.findOne({ userType: 'admin' });
    if (!existingAdmin) {
      await CompanyModel.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: GeneratePasswordUtility('password'),
        type: 'admin'
      });
      console.log('Admin created successfully!');
    } else {
      console.log('Admin user already exists.');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}
async function seedPlan(): Promise<void> {
  try {
    await PlanModel.create({
      name: 'Free Plan',
      trial_days: 100,
      max_workspaces: 100,
      max_users: 100,
      max_clients: 100,
      max_projects: 100,
      image: 'free_plan.png',
      status: 1,
      is_default : 1
    });
    console.log('Plan created successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding plan:', error);
  }
}

const URI = envConfig.DATABASE_URL;
const OPTION = { user: '', pass: '', autoIndex: true };
mongoose
  .connect(URI, OPTION)
  .then(() => {
    console.log('Connected to MongoDB');
    seedAdmin()
      .then(() => {
        console.log('Admin seeding completed.');
      })
      .catch((error) => {
        console.error('Admin seeding failed:', error);
      });
    seedPlan()
      .then(() => {
        console.log('Plan seeding completed.');
      })
      .catch((error) => {
        console.error('Plan seeding failed:', error);
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
