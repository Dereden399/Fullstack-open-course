import React from "react";
import DiagnoseCodeList from "./DiagnoseCodeList";
import { Segment, Icon, List, Popup } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";

const RatingHeart = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return (
        <Popup
          content='Healthy'
          position='right center'
          trigger={<Icon size='big' name='heart' color='green' />}
        />
      );
    case 1:
      return (
        <Popup
          content='Low risk'
          position='right center'
          trigger={<Icon size='big' name='heart' color='yellow' />}
        />
      );
    case 2:
      return (
        <Popup
          content='High risk'
          position='right center'
          trigger={<Icon size='big' name='heart' color='orange' />}
        />
      );
    case 3:
      return (
        <Popup
          content='Critical risk'
          position='right center'
          trigger={<Icon size='big' name='heart' color='red' />}
        />
      );
    default:
      return <Icon size='big' name='heart' />;
  }
};

const HealthCheckElement = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Segment raised>
      <List>
        <div className='item'>
          <Icon name='heartbeat' size='big' color='red' />
          <div className='content'>
            <b className='header'>{entry.date}</b>
            <div className='description'>
              <i>{entry.description}</i>
            </div>
          </div>
        </div>
      </List>
      <div>
        Health rating: <RatingHeart rating={entry.healthCheckRating} />
      </div>
      <DiagnoseCodeList patientDiagnoses={entry.diagnosisCodes} />
      <div>
        By <b>{entry.specialist}</b>
      </div>
    </Segment>
  );
};

export default HealthCheckElement;
