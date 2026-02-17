import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = new Transaction();
    transaction.total = createTransactionDto.total;
    await this.transactionRepository.save(transaction);

    for (const contents of createTransactionDto.contents) {
      const product = await this.productRepository.findOneBy({
        id: contents.productId,
      });
      //nos aseguramos que el producto no sea null
      if (!product) {
        throw new Error(
          `el Producto con id ${contents.productId} no fue encontrado`,
        );
      }
      if (contents.quantity > product.inventory) {
        throw new BadRequestException(
          `el Producto con id ${contents.productId} no tiene suficiente inventario para esta venta, inventario actual: ${product.inventory + contents.quantity}, cantidad solicitada: ${contents.quantity}`,
        );
      }
      product.inventory -= contents.quantity;
      await this.transactionContentsRepository.save({
        ...contents,
        transaction: transaction,
        product: product,
      });
    }
    return 'venta almacenada correctamente';
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
