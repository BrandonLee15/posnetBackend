import { IsNumberString, IsOptional } from 'class-validator';
export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'la categoria debe ser un numero' })
  category_Id: number;

  @IsOptional()
  @IsNumberString({}, { message: 'la cantidad debe ser un numero' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'la cantidad debe ser un numero' })
  skip: number;
}
