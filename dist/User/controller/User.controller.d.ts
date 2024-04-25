import { UserService } from "../service/User.service";
import { HttpResponse } from "src/interfaces/HttpResponse";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    validateToken(): HttpResponse;
}
