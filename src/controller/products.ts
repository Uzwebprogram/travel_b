import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ProductsEntity } from '../entities/products';

class ProductsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ProductsEntity ).find({
            relations:{
                category:true
            }}));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ProductsEntity ).find({
            relations:{
                category:true
            },where: { id: +id }}));
    }

    public async Post(req: Request, res: Response) {
        try {
            const {title_uz,title_ru,title_en , description_ru , description_en , description_uz ,description2_ru , description2_en , description2_uz , image, sale_count , category } = req.body

            const products = await AppDataSource.getRepository(ProductsEntity ).createQueryBuilder().insert().into(ProductsEntity ).values({title_uz,title_ru,title_en , description_ru , description_en , description_uz ,description2_ru , description2_en , description2_uz , image, sale_count , category }).returning("*").execute()

            res.json({
                status: 201,
                message: "products created",
                data: products.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const {title_uz,title_ru,title_en , description_ru , description_en , description_uz ,description2_ru , description2_en , description2_uz , image, sale_count , category } = req.body
            const { id } = req.params

            const products = await AppDataSource.getRepository(ProductsEntity ).createQueryBuilder().update(ProductsEntity )
                .set({title_uz,title_ru,title_en , description_ru , description_en , description_uz ,description2_ru , description2_en , description2_uz , image, sale_count , category  })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "products updated",
                data: products.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const products = await AppDataSource.getRepository(ProductsEntity ).createQueryBuilder().delete().from(ProductsEntity ).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "products deleted",
                data: products.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductsController();