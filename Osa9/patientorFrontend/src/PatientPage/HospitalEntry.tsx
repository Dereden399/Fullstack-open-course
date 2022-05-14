import React from "react";
//import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import { Segment, Icon, List } from "semantic-ui-react";
import DiagnoseCodeList from "./DiagnoseCodeList";

const HospitalEntryElement = ({ entry }: { entry: HospitalEntry }) => {
  //const [{diagnoses},] = useStateValue();
  return (
    <Segment raised>
      <List>
        <div className='item'>
          <Icon className='big red hospital' />
          <div className='content'>
            <b className='header'>{entry.date}</b>
            <div className='description'>
              <i>{entry.description}</i>
            </div>
          </div>
        </div>
      </List>
      <div>
        <b>Discharge:</b>
      </div>
      <List bulleted>
        <List.Item>{entry.discharge.date}</List.Item>
        <List.Item>{entry.discharge.criteria}</List.Item>
      </List>
      <DiagnoseCodeList patientDiagnoses={entry.diagnosisCodes} />
      <div>
        By <b>{entry.specialist}</b>
      </div>
    </Segment>
  );
};

export default HospitalEntryElement;
