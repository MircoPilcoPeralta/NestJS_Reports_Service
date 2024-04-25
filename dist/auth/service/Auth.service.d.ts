import { UserService } from 'src/User/service/User.service';
import { RegisterUserDto } from 'src/User/dto/RegisterUser.dto';
import { LoginUserDto } from 'src/User/dto/LoginUser.dto';
import { JWTPayload } from '../JWTPayload.model';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    isEmailRegistered(email: string): Promise<boolean>;
    register(registerDto: RegisterUserDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    createJWT(id: string, email: string): Promise<{
        access_token: string;
    }>;
    verifyToken(payload: JWTPayload): Promise<import("../../User/schema/User.schema").User>;
}
