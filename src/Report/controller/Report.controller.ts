import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards } from "@nestjs/common";
import { NotFoundException, BadRequestException } from '@nestjs/common/exceptions';
import { ReportVo } from "../vo/Report.vo";
import { ReportService } from "../service/Report.service";
import { HttpResponse } from "src/interfaces/HttpResponse";
import { CreateReportDto } from "../dto/CreateReport.dto";
import { Report } from "../schema/Report.schema";
import { UserService } from "src/User/service/User.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auht.guard";

@Controller("api/v1/report")
@UseGuards(JwtAuthGuard)
export class ReportController {
    constructor (
        private reportService: ReportService,
        private userService: UserService
    ){}


    @Post()
    async persistReport(@Body() dto: CreateReportDto): Promise<HttpResponse> {
        const user = await this.userService.findById(dto.userId);
        if(!user){
            throw new BadRequestException(new HttpResponse(400, "Usuario no encontrado"));
        }
        const savedReport = await this.reportService.persistReport(dto);
        return new HttpResponse(201, "Reporte guardado correctamente", this.reportEntityToVo(savedReport));        
    }

    
    private reportEntityToVo(report: Report): ReportVo{
        const reportVo = new ReportVo();

        reportVo.id = report.id;
        reportVo.cameraName = report.cameraName;
        reportVo.inference = report.inference;
        reportVo.message = report.message;
        reportVo.imageURL = report.imageURL;
        reportVo.date = report.date.toDateString();
        reportVo.time = report.time;
        
        return reportVo;
    }
}