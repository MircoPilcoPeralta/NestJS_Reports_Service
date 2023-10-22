import { Module } from "@nestjs/common";
import { UserModule } from "src/User/User.module";
import { AuthController } from "./controller/Auth.controller";
import { AuthService } from "./service/Auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret
        })
    ],
    controllers: [],
    providers: [JwtStrategy]
})

export class AuthModule{}
