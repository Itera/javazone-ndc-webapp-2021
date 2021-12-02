import { DigTheDigital } from "./DigTheDigital";
import { MakeADifference } from "./MakeADifference";
import { AllDataIsBiased } from "./AllDataIsBiased";
import { PeoplePassionPurpose } from "./PeoplePassionPurpose";
import { HumanSolutions } from "./HumanSolutions";
import { ScrumIsYum } from "./ScrumIsYum";
import { Fragment, useState } from "react";
import { useMount } from "../../../hooks/useMount";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function Quotes() {
  const [current, setCurrent] = useState(0);

  const quotes = [
    <DigTheDigital />,
    <MakeADifference />,
    <AllDataIsBiased />,
    <PeoplePassionPurpose />,
    <HumanSolutions />,
    <ScrumIsYum />,
  ];

  useMount(() => {
    setCurrent(() => getRandomInt(quotes.length));
  });

  return (
    <div style={{ maxWidth: "75vw", width: "100%" }}>
      {quotes
        .filter((_, index) => index === current)
        .map((quote, index) => (
          <Fragment key={index}>{quote}</Fragment>
        ))}
    </div>
  );
}
