import { User } from 'src/User/schema/User.schema';
export declare class Report {
    id: string;
    cameraName: string;
    inference: number;
    message: string;
    date: Date;
    time: string;
    imageURL: string;
    userId: string;
    user: User;
}
