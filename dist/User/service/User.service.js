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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_schema_1 = require("../schema/User.schema");
const typeorm_2 = require("typeorm");
const mongoose_1 = require("mongoose");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    async findById(id) {
        try {
            const findReport = this.userRepository.findOneBy({ _id: new mongoose_1.default.Types.ObjectId(id) });
            return findReport;
        }
        catch (error) {
            return null;
        }
    }
    async persist(dto) {
        const newUser = new User_schema_1.User;
        newUser.fullName = dto.fullName;
        newUser.email = dto.email;
        newUser.password = dto.password;
        return this.userRepository.save({ ...newUser });
    }
    async validateJWTPayload(payload) {
        const { id } = payload;
        return this.userRepository.findOneBy({ _id: new mongoose_1.default.Types.ObjectId(id) });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_schema_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=User.service.js.map