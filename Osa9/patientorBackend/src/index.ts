import express from 'express';
import diagnosesRoute from './routes/diagnosesRoute';
import patientRoute from './routes/patientRoute';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
   res.send("pong");
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientRoute);

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`);
});