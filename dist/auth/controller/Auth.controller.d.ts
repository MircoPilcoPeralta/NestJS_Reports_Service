import { AuthService } from '../service/Auth.service';
import { LoginUserDto } from 'src/User/dto/LoginUser.dto';
import { RegisterUserDto } from 'src/User/dto/RegisterUser.dto';
import { HttpResponse } from 'src/interfaces/HttpResponse';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterUserDto): Promise<HttpResponse>;
    login(loginDto: LoginUserDto): Promise<HttpResponse>;
}
