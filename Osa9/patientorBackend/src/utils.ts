import {
  PatientWithoutId,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
  Diagnose,
  EntryBase,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAndMakePatientWithoutId = (body: any): PatientWithoutId => {
  const newPatient: PatientWithoutId = {
    name: parseText(body.name, "name"),
    gender: parseGender(body.gender),
    ssn: parseText(body.ssn, "ssn"),
    occupation: parseText(body.occupation, "occupation"),
    dateOfBirth: parseDateOfBirth(body.dateOfBirth),
    entries: [],
  };
  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseText = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${name}`);
  }
  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const entryTypes = ["HealthCheck", "OccupationalHealthcare", "Hospital"];

const parseEntryType = (type: unknown): string => {
  if (!type || !isString(type) || !entryTypes.includes(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating === "undefined" || !isNumber(rating) || !isRating(rating)) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};

const parseCodes = (codesArray: unknown): Array<Diagnose["code"]> => {
  if (!Array.isArray(codesArray)) {
    throw new Error("Diagnosis codes must be a string array");
  }
  return codesArray.map(code => parseText(code, "diagnose code"));
};

interface EntryWithType extends Omit<EntryBase, "id"> {
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSingleEntry = (entry: any): EntryWithoutId => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!entry || !entry.type) {
    throw new Error("Missing entry type");
  }
  let baseEntry: EntryWithType = {
    description: parseText(entry.description, "description"),
    date: parseDateOfBirth(entry.date),
    specialist: parseText(entry.specialist, "specialist"),
    type: parseEntryType(entry.type),
  };
  if (entry.diagnosisCodes) {
    baseEntry = {
      ...baseEntry,
      diagnosisCodes: parseCodes(entry.diagnosisCodes),
    };
  }
  switch (baseEntry.type) {
    case "HealthCheck":
      const outputEntry1 = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return outputEntry1 as EntryWithoutId;
    case "OccupationalHealthcare":
      let outputEntry2: EntryWithoutId = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseText(entry.employerName, "employer name"),
      };
      if (entry.sickLeave) {
        outputEntry2 = {
          ...outputEntry2,
          sickLeave: {
            startDate: parseDateOfBirth(entry.sickLeave.startDate),
            endDate: parseDateOfBirth(entry.sickLeave.endDate),
          },
        };
      }
      return outputEntry2;
    case "Hospital":
      const outputEntry3 = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDateOfBirth(entry.discharge.date),
          criteria: parseText(entry.discharge.criteria, "criteria"),
        },
      };
      return outputEntry3 as EntryWithoutId;
    default:
      throw new Error("Wrong entry type");
  }
};

/* 
const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) return [];
  if (!Array.isArray(entries)) throw new Error("Incorrect Entries");
  entries.forEach(entry => {
    parseSingleEntry(entry);
  });
  return entries as Entry[];
};
*/
