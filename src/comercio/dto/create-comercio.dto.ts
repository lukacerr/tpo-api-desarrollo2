import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiObjectProperty } from 'src/utils/api-object-property.decorator';

export class CreateSitioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  calle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entreCalleA?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entreCalleB?: string;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  aCargoDe: string;

  @ApiProperty()
  @IsString()
  apertura: string;

  @ApiProperty()
  @IsString()
  cierre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comentarios?: string;
}

export class CreateComercioDto {
  documento: string;

  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  fechaIngreso?: Date;

  @ApiProperty()
  @IsNumber()
  rubroId: number;

  @ValidateIf((x) => !x.sitioId)
  @ApiObjectProperty(CreateSitioDto)
  sitio?: CreateSitioDto;

  @ValidateIf((x) => !x.sitio)
  @ApiProperty()
  @IsNumber()
  sitioId?: number;
}
