import {NextFunction, Request, Response, Router} from "express";
import {NewPatient, NewPatientSchema, NonsensitivePatient} from "../types";
import patientService from "../services/patientService";
import z from 'zod';

const router = Router();

const newPatientParser = (req: Request, res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            res.status(400).send(e.issues);
        }
    }
};

router.get('/', (_req, res: Response<NonsensitivePatient[]>) => {
    res.json(patientService.getAll());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res) => {
    try {
        res.send(patientService.add(req.body));
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send({error: e.message});
        }
    }
});

export default router;