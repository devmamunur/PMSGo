import {Dayjs} from 'dayjs';

export interface ProjectCreateInterface {
    name: string;
    users: string[];
    status: string;
    budget: number;
    description: string;
    start_date: Dayjs | null;
    end_date: Dayjs | null;
}
