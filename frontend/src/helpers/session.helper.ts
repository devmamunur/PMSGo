class SessionHelper {
  static setEmail(email: string): void {
    localStorage.setItem('email', email);
  }
  static getEmail(): string | null {
    return localStorage.getItem('email');
  }
  static setOTP(OTP: string): void {
    localStorage.setItem('OTP', OTP);
  }
  static getOTP(): string | null {
    return localStorage.getItem('OTP');
  }
  static removeEmailAndOTP() {
    localStorage.removeItem('email');
    localStorage.removeItem('OTP');
  }
}

export default SessionHelper;
