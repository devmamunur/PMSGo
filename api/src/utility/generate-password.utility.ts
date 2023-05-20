import {createHash} from 'crypto';
const GeneratePasswordUtility = (password : any) => {
    return createHash('sha256').update(password).digest('hex');
}
export default GeneratePasswordUtility;