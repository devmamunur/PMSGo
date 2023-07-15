import { toast } from 'react-toastify';
let EmailRegx = /\S+@\S+\.\S+/;
const validTypes = ['company', 'user', 'client', 'admin'];
class FormHelper {
  static isEmpty(value: any): boolean {
    return value.length === 0;
  }
  static isMobile(value: any): boolean {
    return value > 9;
  }
  static isEmail(value: any): boolean {
    return !EmailRegx.test(value);
  }
  static isType(value: any) {
    return !validTypes.includes(value);
  }
  static getBase64(file: any): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

export default FormHelper;
