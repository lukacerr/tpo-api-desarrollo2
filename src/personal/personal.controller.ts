import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PersonalService } from './personal.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('personal')
export class PersonalController {
  vecinoService: any;
  constructor(private readonly personalService: PersonalService) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.personalService.signIn(signInDto.legajo, signInDto.pw);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() { user: { sub } }: any) {
    return this.personalService.getMe(sub);
  }
}
