import { createHash } from 'crypto';
const GeneratePasswordUtility = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};
export default GeneratePasswordUtility;
