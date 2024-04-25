import { Strategy } from 'passport-jwt';
import { JWTPayload } from './JWTPayload.model';
import { AuthService } from './service/Auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JWTPayload): Promise<import("../User/schema/User.schema").User>;
}
export {};
