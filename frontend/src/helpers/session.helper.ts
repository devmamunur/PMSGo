
class SessionHelper {
    static setToken(token: string): void {
        localStorage.setItem("token", token);
    }

    static getToken(): any {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        return localStorage.getItem("token");
    }

    static setUserDetails(data: any) {
        if(data){
            localStorage.setItem("userDetails", JSON.stringify(data));
        }
    }

    static getUserDetails(): any {
        const userDetails = localStorage.getItem("userDetails");
        if (userDetails === null) {
            return null;
        }
        return JSON.parse(userDetails);
    }

    static setEmail(Email: string): void {
        localStorage.setItem("Email", Email)
    }

    static getEmail(): string | null {
        return localStorage.getItem("Email")
    }

    static setOTP(OTP: string): void {
        localStorage.setItem("OTP", OTP)
    }

    static getOTP(): string | null {
        return localStorage.getItem("OTP")
    }

    static removeSession(): void {
        localStorage.clear();
        window.location.href = '/login'
    }
}

export default SessionHelper;