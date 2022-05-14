import { Formik, Form, Field } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import {
  DiagnosisSelection,
  RatingOption,
  SelectRatingField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryWithoutId, HealthCheckEntry, HealthCheckRating } from "../types";

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

const HealthCheckForm = ({
  handleSubmit,
  onCancel,
}: {
  handleSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}) => {
  const [{ diagnoses }] = useStateValue();
  const initVal: Omit<HealthCheckEntry, "id"> = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    healthCheckRating: HealthCheckRating.Healthy,
    type: "HealthCheck",
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
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
            <SelectRatingField
              label='Health rating'
              name='healthCheckRating'
              options={ratingOptions}
              setFieldValue={setFieldValue}
            />
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
                  type='submit'
                  floated='right'
                  color='green'
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

export default HealthCheckForm;
