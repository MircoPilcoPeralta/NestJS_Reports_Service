import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "../service/User.service";
import { HttpResponse } from "src/interfaces/HttpResponse";
import { JwtAuthGuard } from "src/auth/guard/jwt-auht.guard";

@Controller("api/v1/user")
@UseGuards(JwtAuthGuard)
export class UserController{
    constructor (private readonly userService: UserService){}

    @Get("validate-token")
    validateToken(): HttpResponse{
        return new HttpResponse(200, "Token de usuario válido");
    }

}