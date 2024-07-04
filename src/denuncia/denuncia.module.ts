import { Module } from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { DenunciaController } from './denuncia.controller';

@Module({
  controllers: [DenunciaController],
  providers: [DenunciaService],
})
export class DenunciaModule {}
