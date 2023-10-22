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

  async validateUser(email: string, password: string): Promise<any> {
    const findUser = await this.userService.findByEmail(email);

    if (findUser === null) {
      return null;
    }

    const samePassword = await compare(password, findUser.password);

    if (samePassword) {
      const { password, ...result } = findUser;
      return result;
    }

    return null;
  }

  async isEmailRegistered (email: string): Promise<boolean>{
    return !!await this.userService.findByEmail(email);
  }

  async register(registerDto: RegisterUserDto) {
    const hashedPassword = await hash(registerDto.password, 10);
    registerDto.password = hashedPassword;
    const savedUser = await this.userService.persist(registerDto);
    return this.createJWT(savedUser.id, savedUser.email);
  }

  async login(loginDto: LoginUserDto ) {
    const {email, password } = loginDto;
    const findUser = await this.validateUser(email, password);
    
    if(!findUser){
        return null;
    }

    return this.createJWT(findUser.id, findUser.email)
  }

  async createJWT(id: string, email: string){
    const payload: JWTPayload = { id, email };
    return { access_token: this.jwtService.sign(payload) };
  }


  async verifyToken(payload: JWTPayload) {
    return this.userService.validateJWTPayload(payload);
  }

}