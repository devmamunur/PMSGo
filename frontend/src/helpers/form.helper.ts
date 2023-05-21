import { toast  } from 'react-toastify';
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
    static isEmpty(value : any) : boolean {
        return value.length === 0;
    }
    static isMobile(value : any): boolean{
        return MobileRegx.test(value);
    }
    static isEmail(value : any): boolean {
        return !EmailRegx.test(value);
    }
    static getBase64(file : any) : any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export default FormHelper;