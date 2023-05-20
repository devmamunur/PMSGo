import { toast  } from 'react-toastify';
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {

    static IsEmpty(value : any) : boolean {
        return value.length === 0;
    }

    static IsMobile(value : any): boolean{
        return MobileRegx.test(value);
    }

    static IsEmail(value : any): boolean {
        return !EmailRegx.test(value);
    }

    static ErrorToast(msg : any) : void {
        toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
    }
    static SuccessToast(msg : any) : void {
        toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
    }


    static getBase64(file : any) : Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export default FormHelper;