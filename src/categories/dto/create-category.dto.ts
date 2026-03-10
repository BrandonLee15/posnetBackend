import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'el campo no puede ir vacio' })
  name: string;
}
