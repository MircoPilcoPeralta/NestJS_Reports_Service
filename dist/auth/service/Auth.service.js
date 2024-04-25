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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const User_service_1 = require("../../User/service/User.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const findUser = await this.userService.findByEmail(email);
        if (findUser === null) {
            return null;
        }
        const samePassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (samePassword) {
            const { password, ...result } = findUser;
            return result;
        }
        return null;
    }
    async isEmailRegistered(email) {
        return !!await this.userService.findByEmail(email);
    }
    async register(registerDto) {
        const hashedPassword = await (0, bcrypt_1.hash)(registerDto.password, 10);
        registerDto.password = hashedPassword;
        const savedUser = await this.userService.persist(registerDto);
        return this.createJWT(savedUser.id, savedUser.email);
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const findUser = await this.validateUser(email, password);
        if (!findUser) {
            return null;
        }
        return this.createJWT(findUser.id, findUser.email);
    }
    async createJWT(id, email) {
        const payload = { id, email };
        return { access_token: this.jwtService.sign(payload) };
    }
    async verifyToken(payload) {
        return this.userService.validateJWTPayload(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [User_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=Auth.service.js.map