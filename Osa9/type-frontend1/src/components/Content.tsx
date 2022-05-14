import React from "react";

import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <ol>
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </ol>
  );
};

export default Content;
