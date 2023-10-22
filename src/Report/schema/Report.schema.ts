import { User } from 'src/User/schema/User.schema';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Report{
    @ObjectIdColumn({name: '_id'})
    id: string;

    @Column()
    cameraName: string;

    @Column()
    inference: number;

    @Column()
    message: string;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    imageURL: string;

    @Column({name: "user_id"})
    userId: string;

    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({ name: 'user_id' })
    user: User;
}