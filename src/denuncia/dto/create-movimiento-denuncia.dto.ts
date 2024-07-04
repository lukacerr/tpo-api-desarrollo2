import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMovimientoDenunciaDto {
  @ApiProperty()
  @IsString()
  causa: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  estado?: string;
}
