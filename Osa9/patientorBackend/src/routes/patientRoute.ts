import { parseAndMakePatientWithoutId, parseSingleEntry } from "../utils";
import express from "express";
import patientService from "../services/patientService";
const route = express.Router();

route.get("/", (_req, res) => {
  res.send(patientService.getPublicPatient());
});

route.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

route.get("/:id/entries", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

route.post("/:id/entries", (req, res) => {
  try {
    const newEntry = parseSingleEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

route.post("/", (req, res) => {
  try {
    const newPatient = parseAndMakePatientWithoutId(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

export default route;
