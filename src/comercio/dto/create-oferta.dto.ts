import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOfertaDto {
  @ApiProperty()
  @IsString()
  titulo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;
}
