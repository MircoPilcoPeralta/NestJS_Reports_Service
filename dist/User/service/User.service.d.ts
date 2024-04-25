import { User } from '../schema/User.schema';
import { MongoRepository } from "typeorm";
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { JWTPayload } from 'src/auth/JWTPayload.model';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: MongoRepository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    persist(dto: RegisterUserDto): Promise<User>;
    validateJWTPayload(payload: JWTPayload): Promise<User>;
}
