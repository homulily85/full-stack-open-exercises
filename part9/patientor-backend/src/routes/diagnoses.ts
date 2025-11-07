import {Response, Router} from "express";
import {Diagnosis} from "../types";
import DiagnosisService from "../services/diagnosisService";

const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.json(DiagnosisService.getAll());
});

export default router;