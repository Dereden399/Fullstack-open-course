import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal, Segment } from "semantic-ui-react";
import { SelectTypeField } from "../AddPatientModal/FormField";
import { EntryWithoutId } from "../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface BaseProps {
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}
interface Props extends BaseProps {
  isOpen: boolean;
  error?: string;
}

const TypeSelector = ({
  changeType,
}: {
  changeType: (values: { type: string }) => void;
}) => (
  <Formik initialValues={{ type: "" }} onSubmit={changeType}>
    {({ submitForm, handleChange }) => {
      return (
        <Form>
          <SelectTypeField
            onChange={(e: React.ChangeEvent) => {
              handleChange(e);
              void submitForm();
            }}
            label='Type'
            name='type'
            options={[
              { value: "HealthCheck", label: "Health Check" },
              { value: "Hospital", label: "Hospital" },
              {
                value: "OccupationalHealthcare",
                label: "Occupational Healthcare",
              },
            ]}
          />
        </Form>
      );
    }}
  </Formik>
);

const EntryForm = ({
  type,
  formSubmit,
  onClose,
}: {
  type: string | undefined;
  formSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}) => {
  switch (type) {
    case "HealthCheck":
      return <HealthCheckForm handleSubmit={formSubmit} onCancel={onClose} />;
    case "Hospital":
      return <HospitalForm handleSubmit={formSubmit} onCancel={onClose} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareForm
          handleSubmit={formSubmit}
          onCancel={onClose}
        />
      );
    default:
      return null;
  }
};

const AddEntryModal = ({ isOpen, error, onClose, onSubmit }: Props) => {
  const [formType, setFormType] = useState<string | undefined>();
  const typeSelectSubmit = (values: { type: string }) => {
    if (values.type) setFormType(values.type);
    else {
      setFormType(undefined);
    }
  };
  const submitWithClearType = (values: EntryWithoutId) => {
    setFormType(undefined);
    onSubmit(values);
  };
  const closeWithClearType = () => {
    setFormType(undefined);
    onClose();
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
        <TypeSelector changeType={typeSelectSubmit} />
        <EntryForm
          type={formType}
          formSubmit={submitWithClearType}
          onClose={closeWithClearType}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
