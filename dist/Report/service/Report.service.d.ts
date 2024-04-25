import { Report } from "../schema/Report.schema";
import { MongoRepository } from "typeorm";
import { CreateReportDto } from "../dto/CreateReport.dto";
export declare class ReportService {
    private readonly reportRepository;
    constructor(reportRepository: MongoRepository<Report>);
    private getMongoId;
    findById(id: number): Promise<Report | null>;
    findByUserId(userId: number): Promise<Report[]>;
    persistReport(dto: CreateReportDto): Promise<Report>;
    deleteReportById(report: Report): Promise<void>;
}
