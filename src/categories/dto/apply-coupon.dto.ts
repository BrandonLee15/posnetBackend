import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'el nombre del cupon no puede ir vacio' })
  coupon_name: string;
}
