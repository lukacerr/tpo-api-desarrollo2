import { PartialType } from '@nestjs/swagger';
import { CreateComercioDto } from './create-comercio.dto';

export class UpdateComercioDto extends PartialType(CreateComercioDto) {}
