import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from '../schema/User.schema';
import { MongoRepository } from "typeorm";
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { JWTPayload } from 'src/auth/JWTPayload.model';
import mongoose from  "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: MongoRepository<User>
    ){}

    async findByEmail(email: string): Promise<User | null>{
        return this.userRepository.findOneBy({email});
    }

    async findById(id: string): Promise<User | null>{
        try {
            const findReport = this.userRepository.findOneBy({_id: new mongoose.Types.ObjectId(id)});
            return findReport;
        } catch (error) {
            return null;
        }
        
    }

}