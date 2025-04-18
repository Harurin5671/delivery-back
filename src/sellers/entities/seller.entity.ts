import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('seller_profiles')
  export class SellerProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @OneToOne(() => User, (user) => user.sellerProfile, {
      onDelete: 'CASCADE',
    })
    @JoinColumn()   // aquí se crea la FK userId en seller_profiles
    user: User;
  
    @Column()
    storeName: string;
  
    @Column({ nullable: true })
    address?: string;
  
    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    latitude?: number;
  
    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    longitude?: number;
  
    @Column({ type: 'time', nullable: true })
    openTime?: string;
  
    @Column({ type: 'time', nullable: true })
    closeTime?: string;
  
    @Column({ nullable: true })
    phone?: string;
  }
  