import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FormPayEntity } from '../entities/form-pay';

class FormPayController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(FormPayEntity ).find());
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(FormPayEntity ).find({where: { id: +id }}));
    }

    public async Post(req: Request, res: Response) {
        try {
            const { name,phone_number,email , date , status} = req.body

            const formPay = await AppDataSource.getRepository(FormPayEntity ).createQueryBuilder().insert().into(FormPayEntity ).values({ name,phone_number,email , date , status }).returning("*").execute()

            res.json({
                status: 201,
                message: "formPay created",
                data: formPay.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { name,phone_number,email , date , status} = req.body
            const { id } = req.params

            const formPay = await AppDataSource.getRepository(FormPayEntity ).createQueryBuilder().update(FormPayEntity )
                .set({ name,phone_number,email , date , status })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "formPay updated",
                data: formPay.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const formPay = await AppDataSource.getRepository(FormPayEntity ).createQueryBuilder().delete().from(FormPayEntity ).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "formPay deleted",
                data: formPay.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new FormPayController();