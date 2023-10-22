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

    async persist(dto: RegisterUserDto): Promise<User>{
        const newUser = new User;
        newUser.fullName = dto.fullName;
        newUser.email = dto.email;
        newUser.password = dto.password;
        return this.userRepository.save({...newUser});
    }

    async validateJWTPayload(payload: JWTPayload): Promise<User> {
        const { id } = payload;
        return this.userRepository.findOneBy({ _id: new mongoose.Types.ObjectId(id) }); 
      }

}