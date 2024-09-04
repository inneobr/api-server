import { Request, Response } from 'express';

export class RuningControllers {
    async status(req: Request, res: Response) {
        return res.status(201).json({ 
            enterprise: "APIS REST INNEO BRASIL",
            contact: "inneobr@gmail.com",
            status: "Server is runing",
            port: process.env.PORT
         });
    }
}