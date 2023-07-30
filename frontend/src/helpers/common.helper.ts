import SessionHelper from '@/helpers/session.helper';

class CommonHelper{
    static  showFirstNCharacters(str  : string, n : number) : string {
        if (str.length > n) {
            return str.slice(0, n) + "...";
        } else {
            return str;
        }
    }
    static calculateDueDate(startDate : string, endDate : string) {
        const sD = new Date(startDate);
        const ed = new Date(endDate)
        const timeDifference = ed.getTime() - sD.getTime();
        return timeDifference / (1000 * 60 * 60 * 24);
    }
}

export default CommonHelper;