import React from "react";
import { examples, getDocs } from "../services/get";
import { useAsync } from "react-async-hook";
import { Card } from "@blueprintjs/core";

export const DocList = () => {
  //   let d = getDocs(examples[0]);
  //   console.log(d);
  const status = useAsync(getDocs, [examples[0]]);
  if (status.loading) return <>Loading...</>;
  if (status.error) throw status.error;
  // return <>{`Something went wrong: ${status.error.message}`}</>;
  if (status.result) {
    console.log(status.result.doc.supportedClasses.toArray());

    return (
      <div>
        {/* {status.result.doc.supportedClasses
          .toArray()
          .filter((c) => !c.iri.includes("hydra"))
          .map((c) => (
            <Card key={c.iri}>
              {c.displayName} - {c.description}
            </Card>
          ))} */}
      </div>
    );
  }
  return null;
};
export default DocList;
