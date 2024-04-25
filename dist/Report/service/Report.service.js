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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Report_schema_1 = require("../schema/Report.schema");
const typeorm_2 = require("typeorm");
const mongoose_1 = require("mongoose");
let ReportService = class ReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    getMongoId(mongoIdString) {
        return new mongoose_1.default.Types.ObjectId(mongoIdString);
    }
    async findById(id) {
        try {
            const findReport = this.reportRepository.findOneBy({ _id: this.getMongoId(id) });
            return findReport;
        }
        catch (error) {
            return null;
        }
    }
    async findByUserId(userId) {
        return this.reportRepository.find({
            userId,
            order: { date: "DESC" }
        });
    }
    async persistReport(dto) {
        const newReport = new Report_schema_1.Report();
        newReport.cameraName = dto.cameraName;
        newReport.inference = dto.inference;
        newReport.message = dto.message;
        newReport.date = new Date(dto.date);
        newReport.time = dto.time;
        newReport.userId = dto.userId;
        newReport.imageURL = dto.imageURL;
        return this.reportRepository.save(newReport);
    }
    async deleteReportById(report) {
        this.reportRepository.remove(report);
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Report_schema_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=Report.service.js.map