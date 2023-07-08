import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { UslugyEntity} from '../entities/uslugy';

class UslugyController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(UslugyEntity).find());
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(UslugyEntity).find({where: { id: +id }}));
    }

    public async Post(req: Request, res: Response) {
        try {
            const { title_uz,title_ru , title_en , description_uz,description_ru , description_en , image } = req.body

            const Uslugy = await AppDataSource.getRepository(UslugyEntity).createQueryBuilder().insert().into(UslugyEntity).values({ title_uz,title_ru , title_en , description_uz,description_ru , description_en  , image }).returning("*").execute()

            res.json({
                status: 201,
                message: "Uslugy created",
                data: Uslugy.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz,title_ru , title_en , description_uz,description_ru , description_en , image  } = req.body
            const { id } = req.params

            const Uslugy = await AppDataSource.getRepository(UslugyEntity).createQueryBuilder().update(UslugyEntity)
                .set({ title_uz,title_ru , title_en , description_uz,description_ru , description_en  , image  })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "Uslugy updated",
                data: Uslugy.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const Uslugy = await AppDataSource.getRepository(UslugyEntity).createQueryBuilder().delete().from(UslugyEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "Uslugy deleted",
                data: Uslugy.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UslugyController();