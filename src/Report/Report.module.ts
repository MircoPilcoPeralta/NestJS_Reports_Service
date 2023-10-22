import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from "./schema/Report.schema";
import { ReportService } from "./service/Report.service";
import { ReportController } from "./controller/Report.controller";
import { UserModule } from "src/User/User.module";

@Module({
    imports: [TypeOrmModule.forFeature([Report]), UserModule ],
    providers: [ReportService],
    controllers: [ReportController],
    exports: [ReportService]
})

export class ReportModule{};
