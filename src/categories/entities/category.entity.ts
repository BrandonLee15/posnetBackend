//aqui es todo el mapeo o estructura de la base de datos
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;
  //esta parte es para relacionar con otro base de datos en su caso la de productos
  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
