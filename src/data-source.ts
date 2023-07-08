import "reflect-metadata"
import { DataSource } from "typeorm"
import { CategoryEntity } from "./entities/category"
import { ProductsEntity } from "./entities/products"
import { FormEntity } from "./entities/forma"
import { BlogEntity } from "./entities/blog"
import { UslugyEntity } from "./entities/Uslugy"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1sU*DtM&9RfB",
    database: "travel_b", 
    synchronize: true,
    logging: false,
    entities: [CategoryEntity , ProductsEntity , FormEntity , BlogEntity, UslugyEntity],
    migrations: [],
    subscribers: [],
})
