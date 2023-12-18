import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn} from "typeorm";


@Entity({ name: "formPay" })
export class FormPayEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    name: string

    @Column({ type: "varchar", length: 30 })
    @IsString()
    phone_number: string
    @Column({ type: "varchar", length: 30  , nullable : true})
    @IsString()
    email: string
    @Column({ type: "varchar", length: 30 })
    @IsString()
    date: string
    @Column({ type: "varchar", length: 30, default:"no_paid" })
    @IsString()
    status: string
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}