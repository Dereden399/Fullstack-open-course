import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryWithoutId, HospitalEntry } from "../types";

const HospitalForm = ({
  handleSubmit,
  onCancel,
}: {
  handleSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}) => {
  const [{ diagnoses }] = useStateValue();
  const initVal: Omit<HospitalEntry, "id"> = {
    date: "",
    type: "Hospital",
    specialist: "",
    diagnosisCodes: [],
    description: "",
    discharge: {
      date: "",
      criteria: "",
    },
  };
  return (
    <Formik
      onSubmit={handleSubmit}
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
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, submitForm }) => {
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoses}
            />
            <Header as='h3'>Discharge</Header>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='discharge.date'
              component={TextField}
              validate={(v: string) => {
                let error: string | undefined;
                if (!v) error = "Field is required";
                else if (v.length !== 10 || !Date.parse(v)) {
                  error = "Must be YYYY-MM-DD";
                }
                return error;
              }}
            />
            <Field
              label='Criteria'
              placeholder='Criteria'
              name='discharge.criteria'
              component={TextField}
              validate={(v: string) => {
                let error: string | undefined;
                if (!v) error = "Field is required";
                return error;
              }}
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
                  onClick={submitForm}
                  disabled={!dirty || !isValid}
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

export default HospitalForm;
