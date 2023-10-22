import { Injectable } from '@nestjs/common';
import { UserService } from 'src/User/service/User.service';
import { RegisterUserDto } from 'src/User/dto/RegisterUser.dto';
import { LoginUserDto } from 'src/User/dto/LoginUser.dto'; 
import { hash, compare } from 'bcrypt';
import { JWTPayload } from '../JWTPayload.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}


  async register(registerDto: RegisterUserDto) {
    const hashedPassword = await hash(registerDto.password, 10);
    registerDto.password = hashedPassword;
    const savedUser = await this.userService.persist(registerDto);
    return this.createJWT(savedUser.id, savedUser.email);
  }

}