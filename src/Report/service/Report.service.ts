import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../schema/Report.schema";
import { MongoRepository, Between } from "typeorm";
import { CreateReportDto } from "../dto/CreateReport.dto";
import mongoose from  "mongoose";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report) private readonly reportRepository: MongoRepository<Report>
    ){}

    private getMongoId(mongoIdString): mongoose.Types.ObjectId{
        return new mongoose.Types.ObjectId(mongoIdString);
    }
        

    async findById(id: number): Promise<Report | null>{
        try {
            const findReport = this.reportRepository.findOneBy({_id: this.getMongoId(id)});
            return findReport;
        } catch (error) {
            return null;
        }
    }

    async findByUserId(userId: number): Promise<Report[]>{
        return this.reportRepository.find({
            userId,             
            order: { date: "DESC"}
        });
    }

    async persistReport( dto: CreateReportDto ): Promise<Report>{
        const newReport = new Report();
        newReport.cameraName = dto.cameraName;
        newReport.inference = dto.inference;
        newReport.message = dto.message;
        newReport.date = new Date(dto.date);
        newReport.time = dto.time;
        newReport.userId = dto.userId;
        newReport.imageURL = dto.imageURL;

        return this.reportRepository.save(newReport);
    } 

    async deleteReportById(report: Report) {
        this.reportRepository.remove(report);
    }
}