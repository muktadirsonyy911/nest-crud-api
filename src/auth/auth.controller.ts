import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    // authService: AuthService;
    // constructor(authService: AuthService){
    //     this.authService = authService;
    // }
    constructor(private authService: AuthService) { }

    @Post('signUp')
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

} 