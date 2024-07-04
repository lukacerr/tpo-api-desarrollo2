/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { Transform, Type, TypeOptions } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';

export interface IObjectPorperty {
  isOptional: boolean;
  declareAsOptional: boolean;
  description: string;
  isArray: boolean;
  isArrayOrObject: boolean;
  apiPropertyOptions: ApiPropertyOptions;
  validationOptions: ValidationOptions;
  typeOptions: TypeOptions;
}

export const ApiObjectProperty = (
  type: Function,
  op?: Partial<IObjectPorperty>,
) =>
  applyDecorators(
    ...[
      op?.isOptional || op?.declareAsOptional
        ? ApiPropertyOptional({
            description: op?.description,
            ...op?.apiPropertyOptions,
          })
        : ApiProperty({
            description: op?.description,
            ...op?.apiPropertyOptions,
          }),
      op?.isOptional && IsOptional(),
      op?.isArrayOrObject &&
        Transform(({ value }) => (Array.isArray(value) ? value : [value])),
      IsObject({ each: op?.isArray || op?.isArrayOrObject }),
      Type(() => type, op?.typeOptions),
      ValidateNested({
        each: op?.isArray || op?.isArrayOrObject,
        ...op?.validationOptions,
      }),
    ].filter((x) => x !== undefined && typeof x !== 'boolean'),
  );
