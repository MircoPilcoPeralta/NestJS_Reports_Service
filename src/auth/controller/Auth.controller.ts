import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from '../service/Auth.service';
import { LoginUserDto } from 'src/User/dto/LoginUser.dto';
import { RegisterUserDto } from 'src/User/dto/RegisterUser.dto';
import { HttpResponse } from 'src/interfaces/HttpResponse';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto): Promise<HttpResponse> {
        if(await this.authService.isEmailRegistered(registerDto.email)){
            throw new BadRequestException(new HttpResponse(400, "El email ingresado ya se encuentra registrado"));
        }
        return new HttpResponse(200, "Usuario registrado exitosamente", await this.authService.register(registerDto));
    }


    @Post("login")
    async login(@Body() loginDto: LoginUserDto): Promise<HttpResponse> {
        const token = await this.authService.login(loginDto);
        if(!token){
            throw new BadRequestException(new HttpResponse(400, "Correo o contraseña incorrectos."));
        }
        return new HttpResponse(200, "Inicio de sesion exitoso", token);
    }

}






