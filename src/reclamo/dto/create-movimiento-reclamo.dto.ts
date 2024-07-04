import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMovimientoReclamoDto {
  @ApiProperty()
  @IsString()
  causa: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  estado?: string;
}
