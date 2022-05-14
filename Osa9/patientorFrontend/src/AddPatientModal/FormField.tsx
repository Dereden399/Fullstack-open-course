import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, HealthCheckRating } from "../types";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

export type RatingOption = {
  value: HealthCheckRating;
  label: string;
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectTypeField = ({
  name,
  label,
  options,
  onChange,
}: {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  onChange: (e: React.ChangeEvent) => void;
}) => (
  <Form.Field>
    <label style={{ paddingRight: 5 }}>{label}</label>
    <Field as='select' name={name} onChange={onChange} className='ui dropdown'>
      <option value=''>Select type</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectRatingField = ({
  name,
  label,
  options,
  setFieldValue,
}: {
  name: string;
  label: string;
  options: RatingOption[];
  setFieldValue: FormikProps<{ rating: HealthCheckRating }>["setFieldValue"];
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field
      as='select'
      name={name}
      className='ui dropdown'
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue("healthCheckRating", Number(e.target.value))
      }
    >
      {options.map(option => (
        <option key={option.value} value={Number(option.value)}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

interface CheckBoxProps {
  label: string;
  name: string;
  className?: string;
}

export const CheckBoxField = ({ name, label, className }: CheckBoxProps) => (
  <Form.Field>
    <label>
      <span style={{ paddingRight: 5 }}>{label}</span>
      <Field
        name={name}
        type='checkbox'
        className={className ? className : null}
      />
    </label>
  </Form.Field>
);

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
