import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'el nombre del producto es obligatorio' })
  @IsString({ message: 'Valor no valido' })
  name: string;

  @IsNotEmpty({ message: 'el precio del producto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio no valido' })
  price: number;

  @IsNotEmpty({ message: 'la cantidad no puede ir vacia' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'cantidad no valida' })
  inventory: number;

  @IsNotEmpty({ message: 'la categoria no puede ir vacia' })
  @IsInt({ message: 'la categoria no es valida' })
  categoryId: number;
}
