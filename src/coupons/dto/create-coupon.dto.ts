import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'el nombre del cupon es obligatorio' })
  name: string;

  @IsNotEmpty({ message: 'el descuento no puede ir vacio' })
  @IsInt({ message: 'el descuento debe ser entre 1 y 100' })
  @Max(100, { message: 'el descuento maximo es de 100' })
  @Min(1, { message: 'el descuento minimo es de 1' })
  percentage: number;

  @IsNotEmpty({ message: 'la fecha de expiracion no puede ir vacia' })
  @IsDateString({}, { message: 'la fecha no es valida' })
  expirationDate: Date;
}
