import { isString, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "./category";

@Entity({ name: "products" })
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 300 })
    @IsString()
    title_uz: string

    @Column({ type: "varchar", length: 300 })
    @IsString()
    title_ru: string

    @Column({ type: "varchar", length: 300 })
    @IsString()
    title_en: string

    @Column({ type: "text"})
    @IsString()
    description_uz: string

    @Column({ type: "text"})
    @IsString()
    description_ru: string

    @Column({ type: "text"})
    @IsString()
    description_en: string

    @Column({ type: "text"})
    @IsString()
    description2_uz: string

    @Column({ type: "text"})
    @IsString()
    description2_ru: string

    @Column({ type: "text"})
    @IsString()
    description2_en: string

    @Column({ type: "text", nullable : true })
    @IsString()
    image: string
    @Column({ type: "text", nullable : true })
    @IsString()
    sale_count: string
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>CategoryEntity,(category)=>category.products)
    category:CategoryEntity

}