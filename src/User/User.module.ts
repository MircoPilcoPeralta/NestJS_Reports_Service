import { Module } from "@nestjs/common";
import { User } from "./schema/User.schema";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [],
    controllers: [],
    exports: []
})

export class UserModule{};