import React from "react";

import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <li>
          <b>{part.name}</b>
          <br />
          <i>{part.description}</i>
          <br />
          Number of exercises: {part.exerciseCount}
        </li>
      );
    case "groupProject":
      return (
        <li>
          <b>{part.name}</b>
          <br />
          Project exercises: {part.groupProjectCount}
          <br />
          Number of exercises: {part.exerciseCount}
        </li>
      );
    case "submission":
      return (
        <li>
          <b>{part.name}</b>
          <br />
          <i>{part.description}</i>
          <br />
          Number of exercises: {part.exerciseCount} <br />
          Submit to {part.exerciseSubmissionLink}
        </li>
      );
    case "special":
      return (
        <li>
          <b>{part.name}</b>
          <br />
          <i>{part.description}</i>
          <br />
          requirements: {part.requirements.join(", ")} <br />
          Number of exercises: {part.exerciseCount}
        </li>
      );
    default:
      assertNever(part);
      return <div>Something went wrong</div>;
  }
};

export default Part;
