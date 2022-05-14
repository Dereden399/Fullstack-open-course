import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStateValue } from "../state";
import { useParams } from "react-router";
import { Entry, Patient, Gender, EntryWithoutId } from "../types";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { updatePatient } from "../ActionCreators";
import HospitalEntryElement from "./HospitalEntry";
import HealthCheckElement from "./HealthCheckElement";
import OccupationalHealthcareElement from "./OccupationalHealthcareElement";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryElement entry={entry} />;
    case "HealthCheck":
      return <HealthCheckElement entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareElement entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  useEffect(() => {
    const getPatientInfo = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `/api/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (error) {
        console.error(error);
      }
    };
    if (!patients[id]?.ssn) {
      void getPatientInfo();
    }
  });
  const patient = patients[id];
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setError(undefined);
  };

  const addNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      let patientWithEntry: Patient = {
        ...patient,
      };
      if (patient.entries) {
        patientWithEntry = {
          ...patientWithEntry,
          entries: [...patient.entries, newEntry],
        };
      }
      dispatch(updatePatient(patientWithEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
      setTimeout(() => setError(undefined), 5000);
    }
  };

  if (!patient) {
    return (
      <div>
        <Container textAlign='center'>
          <h3>No such patient</h3>
        </Container>
      </div>
    );
  }
  if (!patient.ssn) {
    return (
      <div>
        <Container textAlign='center'>
          <h3>Loading...</h3>
        </Container>
      </div>
    );
  }
  return (
    <div style={{ paddingBottom: 14 }}>
      <Container textAlign='left'>
        <Header as='h1'>
          <Icon
            name={
              patient.gender === Gender.Male
                ? "male"
                : patient.gender === Gender.Female
                ? "female"
                : "detective"
            }
          />
          <Header.Content>{patient.name}</Header.Content>
        </Header>
        <h3>Date of birth: {patient.dateOfBirth}</h3>
        <p>
          <b>Occupation: </b>
          {patient.occupation}
        </p>
        <p>ssn: {patient.ssn}</p>
        <h3>Entries</h3>
        {patient.entries?.map(entry => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
        <Button primary animated size='large' onClick={() => openModal()}>
          <Button.Content visible>Add new entry</Button.Content>
          <Button.Content hidden>
            <Icon name='plus' />
          </Button.Content>
        </Button>
        <AddEntryModal
          isOpen={isOpen}
          error={error}
          onClose={closeModal}
          onSubmit={addNewEntry}
        />
      </Container>
    </div>
  );
};

export default PatientPage;
