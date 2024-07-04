import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VecinoService } from './vecino.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vecino')
export class VecinoController {
  constructor(private readonly vecinoService: VecinoService) {}

  @Get('barrios')
  getBarrios() {
    return this.vecinoService.getBarrios();
  }

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.vecinoService.signIn(signInDto.dni, signInDto.pw);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() { user: { sub } }: any) {
    return this.vecinoService.getMe(sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':pw')
  update(@Request() { user: { sub } }: any, @Param('pw') pw: string) {
    return this.vecinoService.update(sub, pw);
  }
}
