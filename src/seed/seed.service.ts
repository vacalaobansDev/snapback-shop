import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {
  
  constructor(
    private readonly productsService: ProductsService
  ){}

  async runSeed(){
    return 'SEED EXECUTED';
  }

  private async insertNewProducts(){
    this.productsService.deleteAllProducts(); //Delete all products

    const products = initialData.products;

    const insertPromises = []; //Para insertar de manera simultanea

    products.forEach( (product) => {
      insertPromises.push( this.productsService.create( product ) );
    });

    await Promise.all( insertPromises ); //Ejecuto array de promises

    return true;
  }

}
