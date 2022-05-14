import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnoseCodeList from "./DiagnoseCodeList";

const OccupationalHealthcareElement = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Segment raised>
      <List>
        <div className='item'>
          <Icon name='stethoscope' size='big' color='red' />
          <div className='content'>
            <b className='header'>{entry.date}</b>
            <div className='description'>
              <i>{entry.description}</i>
            </div>
            <span>{entry.employerName}</span>
          </div>
        </div>
      </List>
      {entry.sickLeave ? (
        <div>
          Sick leave from <b>{entry.sickLeave.startDate}</b> to{" "}
          <b>{entry.sickLeave.endDate}</b>
        </div>
      ) : null}
      <DiagnoseCodeList patientDiagnoses={entry.diagnosisCodes} />
      <div>
        By <b>{entry.specialist}</b>
      </div>
    </Segment>
  );
};

export default OccupationalHealthcareElement;
