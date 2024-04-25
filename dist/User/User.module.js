"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const User_service_1 = require("./service/User.service");
const User_controller_1 = require("./controller/User.controller");
const User_schema_1 = require("./schema/User.schema");
const typeorm_1 = require("@nestjs/typeorm");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_schema_1.User])],
        providers: [User_service_1.UserService],
        controllers: [User_controller_1.UserController],
        exports: [User_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
;
//# sourceMappingURL=User.module.js.map