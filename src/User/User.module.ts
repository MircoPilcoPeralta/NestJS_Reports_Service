import { Module } from "@nestjs/common";
import { UserService } from "./service/User.service";
import { UserController } from "./controller/User.controller";
import { User } from "./schema/User.schema";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule{};