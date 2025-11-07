import express from 'express';
import cors from 'cors';
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const PORT = 3001;

const app = express();
app.use(express.json());

app.use(cors({origin: 'http://localhost:5173'}));

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});