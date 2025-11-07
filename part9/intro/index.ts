import express from 'express';
import bmiCalculator from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello fullstack");
});

app.get('/bmi', (req, res) => {
    const {weight, height} = req.query;
    if (!weight || !height) {
        res.status(400).json({'error': 'malformatted parameters'});
    } else {
        res.json({
            weight, height, bmi: bmiCalculator(Number(height), Number(weight))
        });
    }

});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let {daily_exercises, target} = req.body;
    if (!daily_exercises || !target) {
        res.status(400).send({error: "parameters missing"});
        return;
    }

    target = Number(target);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(target)) {
        res.status(400).send({error: "malformatted parameters"});
        return;
    }

    for (let i = 3; i < daily_exercises.length; i++) {
        daily_exercises[i] = Number(daily_exercises[i]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (isNaN(daily_exercises[i])) {
            res.status(400).send({error: "malformatted parameters"});
            return;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(daily_exercises, target));

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});