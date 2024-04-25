import { Report } from 'src/Report/schema/Report.schema';
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    reports: Report[];
}
