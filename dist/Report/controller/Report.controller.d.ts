import { ReportService } from "../service/Report.service";
import { HttpResponse } from "src/interfaces/HttpResponse";
import { CreateReportDto } from "../dto/CreateReport.dto";
import { UserService } from "src/User/service/User.service";
export declare class ReportController {
    private reportService;
    private userService;
    constructor(reportService: ReportService, userService: UserService);
    findReportById(id: number): Promise<HttpResponse>;
    findByUserId(userId: number): Promise<HttpResponse>;
    persistReport(dto: CreateReportDto): Promise<HttpResponse>;
    removeReport(id: number): Promise<HttpResponse>;
    private reportEntityToVo;
    private reportListToVoList;
}
