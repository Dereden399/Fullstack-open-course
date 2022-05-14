import data from '../data/diagnoses';
import { Diagnose } from '../types';

const getAllDiagnoses = (): Array<Diagnose> => {
    return data;
};

export default {getAllDiagnoses};