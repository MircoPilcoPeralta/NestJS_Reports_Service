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

    @Get(":id")
    async findReportById( @Param("id") id: number ): Promise<HttpResponse> {
        const findRepository = await this.reportService.findById(id);

        if(!findRepository){
            throw new NotFoundException(
                new HttpResponse(404, "Reporte no encontrado")
            );
        }
        return new HttpResponse(200,"Reporte encontrado correctamente", this.reportEntityToVo(findRepository));
    }

    @Get()
    async findByUserId( @Query("userId") userId: number ): Promise<HttpResponse> {
        const reports = await this.reportService.findByUserId(userId);
        
        if(reports.length === 0){
            return new HttpResponse(200, "El usuario no tiene reportes guardados")
        }

        return new HttpResponse(200, "Reportes encontrados correctamente", this.reportListToVoList(reports));
    }


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

    private reportListToVoList(reports: Report[]): ReportVo[]{
        return reports.map(
            (report: Report) => this.reportEntityToVo(report)
        );
    }

}