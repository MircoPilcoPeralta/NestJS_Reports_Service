import { Report } from 'src/Report/schema/Report.schema';
import { Entity, Column, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn({ name: "_id" })
    id: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

}