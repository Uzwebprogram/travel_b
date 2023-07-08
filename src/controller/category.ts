import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CategoryEntity } from '../entities/category';

class CategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CategoryEntity ).find({
            relations:{
                products:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(CategoryEntity ).find({
            relations:{
         products:true
            },where: { id: +id }}));
    }

    public async Post(req: Request, res: Response) {
        try {
            const { title_uz,title_ru , title_en  } = req.body

            const category = await AppDataSource.getRepository(CategoryEntity ).createQueryBuilder().insert().into(CategoryEntity ).values({ title_uz,title_ru , title_en  }).returning("*").execute()

            res.json({
                status: 201,
                message: "category created",
                data: category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz,title_ru , title_en   } = req.body
            const { id } = req.params

            const category = await AppDataSource.getRepository(CategoryEntity ).createQueryBuilder().update(CategoryEntity )
                .set({ title_uz,title_ru , title_en   })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "category updated",
                data: category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const category = await AppDataSource.getRepository(CategoryEntity ).createQueryBuilder().delete().from(CategoryEntity ).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "category deleted",
                data: category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CategoryController();