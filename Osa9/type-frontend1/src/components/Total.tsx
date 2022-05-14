import React from "react";

import { CoursePart } from "../types";

const Total = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <div>
      <h2>
        Total amount of exercises:{" "}
        {parts.reduce((sum, cur) => sum + cur.exerciseCount, 0)}
      </h2>
    </div>
  );
};

export default Total;
