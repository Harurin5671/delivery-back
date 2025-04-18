import { ValidRoles } from "src/auth/interfaces";
import { SellerProfile } from "src/sellers/entities/seller.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullName: string;

    @Column('varchar',{unique: true})
    email: string;

    @Column('text',{select: false})
    password: string;

    @Column({
        type: 'enum',
        enum: ValidRoles,
        default: ValidRoles.CUSTOMER,
      })
      role: ValidRoles;

      @OneToOne(() => SellerProfile, (profile) => profile.user, {
        cascade: true,    // guarda/actualiza perfil junto al user
        nullable: true,
      })
      sellerProfile?: SellerProfile;

      @BeforeInsert()
      checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
      }

      @BeforeUpdate()
      checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
      }
}


