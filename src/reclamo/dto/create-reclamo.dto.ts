import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
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
  documento: string | number;

  @ApiProperty()
  @IsNumber()
  sitioId: number;

  @ValidateIf((x) => !x.desperfectoId)
  @ApiObjectProperty(CreateDesperfectoDto)
  desperfecto?: CreateDesperfectoDto;

  @ValidateIf((x) => !x.desperfecto)
  @ApiProperty()
  @IsNumber()
  desperfectoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  reclamoUnificadoId?: number;
}
