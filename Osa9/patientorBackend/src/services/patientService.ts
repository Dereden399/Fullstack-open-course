import {
  Patient,
  PublicPatient,
  PatientWithoutId,
  Entry,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";
import data from "../data/patients";

const getPatients = (): Array<Patient> => {
  return data;
};

const getPublicPatient = (): Array<PublicPatient> => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  return data.find(p => p.id === id);
};

const addPatient = (entryData: PatientWithoutId): Patient => {
  const PatientToAdd: Patient = {
    id: uuid(),
    ...entryData,
  };
  data.push(PatientToAdd);
  return PatientToAdd;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  if (!data.find(p => p.id === patientId)) {
    throw new Error("No such patient");
  }
  const entryToAdd: Entry = {
    id: uuid(),
    ...entry,
  };
  data.find(p => p.id === patientId)?.entries.push(entryToAdd);
  return entryToAdd;
};

export default {
  getPatients,
  getPublicPatient,
  findPatientById,
  addPatient,
  addEntry,
};
