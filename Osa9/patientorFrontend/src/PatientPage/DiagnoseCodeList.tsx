import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const DiagnoseElement = ({
  diagnosesList,
  code,
}: {
  diagnosesList: Diagnosis[];
  code: string;
}) => {
  const diagnose: Diagnosis | undefined = diagnosesList.find(
    d => d.code === code
  );
  if (!diagnose) return <List.Item>{code}</List.Item>;
  return (
    <List.Item>
      <List.Header>{diagnose.code}</List.Header>
      <List.Description>{diagnose.name}</List.Description>
      {diagnose.latin ? (
        <List.Description>
          <i>{diagnose.latin}</i>
        </List.Description>
      ) : null}
    </List.Item>
  );
};

const DiagnoseCodeList = ({
  patientDiagnoses,
}: {
  patientDiagnoses: Array<Diagnosis["code"]> | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();
  if (!patientDiagnoses) return null;
  if (patientDiagnoses.length === 0) return null;
  return (
    <div>
      <b>Diagnoses:</b>
      <List bulleted>
        {patientDiagnoses.map(diag => (
          <DiagnoseElement key={diag} diagnosesList={diagnoses} code={diag} />
        ))}
      </List>
    </div>
  );
};

export default DiagnoseCodeList;
