import express from 'express';
import { Request } from 'express';
import bmi from './bmiCalculator';
import exerTable from './exerciseCalculator';

const PORT = 3001;
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    try {
        const argumentArray = ["0", "0", ...Object.values(req.query)];
        const {height, weight} = bmi.parseArguments(argumentArray);
        res.send(bmi.calculateBmi(height, weight));
    } catch (error: unknown){
        if (error instanceof Error) {
            res.send({error: error.message});
        }
    }
});

app.post('/exercises', (req: Request<unknown, unknown, {target: string | number; days: Array<string>}>, res) => {
    try {
        let argumentArray: Array<string | number> = ['0', '0'];
        if (req.body.target) argumentArray = [...argumentArray, req.body.target];
        else {
            throw new Error("you must enter target");
        }
        if (req.body.days) argumentArray = [...argumentArray, ...req.body.days];
        console.log(argumentArray);
        res.json(exerTable.makeExerciseTable(exerTable.parseExerciseArguments(argumentArray)));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.send({error: error.message});
        }
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
