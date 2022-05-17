import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('products')
export class Products {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() imageUrl?: string;
  @Column() price: string;
  @Column() quantity: number;
  @Column() sellerId?: string;
  @Column() buyerId?: string;
}
