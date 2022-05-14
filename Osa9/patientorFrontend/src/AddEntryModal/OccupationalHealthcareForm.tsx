import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import {
  CheckBoxField,
  DiagnosisSelection,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryWithoutId, OccupationalHealthcareEntry } from "../types";

type ValuesProps = Omit<OccupationalHealthcareEntry, "id" | "sickLeave"> & {
  sickLeave: {
    isToggled: boolean;
    startDate: string;
    endDate: string;
  };
};
const initVal: ValuesProps = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  employerName: "",
  sickLeave: {
    isToggled: false,
    startDate: "",
    endDate: "",
  },
  type: "OccupationalHealthcare",
};

const OccupationalHealthcareForm = ({
  handleSubmit,
  onCancel,
}: {
  handleSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}) => {
  const [{ diagnoses }] = useStateValue();

  const submitFullForm = (values: ValuesProps): void => {
    const toReturn: EntryWithoutId = values.sickLeave.isToggled
      ? {
          ...values,
          sickLeave: {
            startDate: values.sickLeave.startDate,
            endDate: values.sickLeave.endDate,
          },
        }
      : {
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          diagnosisCodes: values.diagnosisCodes,
          employerName: values.employerName,
          type: "OccupationalHealthcare",
        };
    handleSubmit(toReturn);
  };

  return (
    <Formik
      initialValues={initVal}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (values.date.length !== 10 || !Date.parse(values.date)) {
          errors.date = "Must be YYYY-MM-DD";
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
      onSubmit={submitFullForm}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        submitForm,
        values,
      }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Employer name'
              placeholder='Employer Name'
              name='employerName'
              component={TextField}
            />
            <CheckBoxField
              name='sickLeave.isToggled'
              label='Sick leave'
              className='ui checkbox'
            />
            {values.sickLeave.isToggled ? (
              <Field
                label='From'
                placeholder='YYYY-MM-DD'
                name='sickLeave.startDate'
                component={TextField}
                validate={
                  values.sickLeave.isToggled
                    ? (v: string) => {
                        let error: string | undefined;
                        if (!v) error = "Field is required";
                        else if (v.length !== 10 || !Date.parse(v)) {
                          error = "Must be YYYY-MM-DD";
                        }
                        return error;
                      }
                    : null
                }
              />
            ) : null}
            {values.sickLeave.isToggled ? (
              <Field
                label='To'
                placeholder='YYYY-MM-DD'
                name='sickLeave.endDate'
                component={TextField}
                validate={
                  values.sickLeave.isToggled
                    ? (v: string) => {
                        let error: string | undefined;
                        if (!v) error = "Field is required";
                        else if (v.length !== 10 || !Date.parse(v)) {
                          error = "Must be YYYY-MM-DD";
                        }
                        return error;
                      }
                    : null
                }
              />
            ) : null}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoses}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='button'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                  onClick={submitForm}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;
