"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const Report_vo_1 = require("../vo/Report.vo");
const Report_service_1 = require("../service/Report.service");
const HttpResponse_1 = require("../../interfaces/HttpResponse");
const CreateReport_dto_1 = require("../dto/CreateReport.dto");
const User_service_1 = require("../../User/service/User.service");
const jwt_auht_guard_1 = require("../../auth/guard/jwt-auht.guard");
let ReportController = class ReportController {
    constructor(reportService, userService) {
        this.reportService = reportService;
        this.userService = userService;
    }
    async findReportById(id) {
        const findRepository = await this.reportService.findById(id);
        if (!findRepository) {
            throw new exceptions_1.NotFoundException(new HttpResponse_1.HttpResponse(404, "Reporte no encontrado"));
        }
        return new HttpResponse_1.HttpResponse(200, "Reporte encontrado correctamente", this.reportEntityToVo(findRepository));
    }
    async findByUserId(userId) {
        const reports = await this.reportService.findByUserId(userId);
        if (reports.length === 0) {
            return new HttpResponse_1.HttpResponse(200, "El usuario no tiene reportes guardados");
        }
        return new HttpResponse_1.HttpResponse(200, "Reportes encontrados correctamente", this.reportListToVoList(reports));
    }
    async persistReport(dto) {
        const user = await this.userService.findById(dto.userId);
        if (!user) {
            throw new exceptions_1.BadRequestException(new HttpResponse_1.HttpResponse(400, "Usuario no encontrado"));
        }
        const savedReport = await this.reportService.persistReport(dto);
        return new HttpResponse_1.HttpResponse(201, "Reporte guardado correctamente", this.reportEntityToVo(savedReport));
    }
    async removeReport(id) {
        const report = await this.reportService.findById(id);
        if (!report) {
            throw new exceptions_1.NotFoundException(new HttpResponse_1.HttpResponse(404, "Reporte no encontrado"));
        }
        await this.reportService.deleteReportById(report);
        return new HttpResponse_1.HttpResponse(200, "Reporte eliminado");
    }
    reportEntityToVo(report) {
        const reportVo = new Report_vo_1.ReportVo();
        reportVo.id = report.id;
        reportVo.cameraName = report.cameraName;
        reportVo.inference = report.inference;
        reportVo.message = report.message;
        reportVo.imageURL = report.imageURL;
        reportVo.date = report.date.toDateString();
        reportVo.time = report.time;
        return reportVo;
    }
    reportListToVoList(reports) {
        return reports.map((report) => this.reportEntityToVo(report));
    }
};
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findReportById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReport_dto_1.CreateReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "persistReport", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "removeReport", null);
ReportController = __decorate([
    (0, common_1.Controller)("api/v1/report"),
    (0, common_1.UseGuards)(jwt_auht_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [Report_service_1.ReportService,
        User_service_1.UserService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=Report.controller.js.map