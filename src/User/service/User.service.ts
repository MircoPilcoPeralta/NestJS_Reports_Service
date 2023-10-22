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


}