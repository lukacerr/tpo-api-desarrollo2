import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiObjectProperty } from 'src/utils/api-object-property.decorator';

export class CreateDesperfectoDto {
  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  rubroId: number;
}

export class CreateReclamoDto {
  documento: string;

  @ApiProperty()
  @IsNumber()
  sitioId: number;

  @ApiObjectProperty(CreateDesperfectoDto)
  desperfecto: CreateDesperfectoDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  reclamoUnificadoId?: number;
}
