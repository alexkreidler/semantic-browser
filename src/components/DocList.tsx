import React from "react";
import { DEFAULT_ENTRYPOINT, getDocs } from "../services/get";
import { useAsync } from "react-async-hook";
import { Card } from "@blueprintjs/core";
import { IDNode } from "@semanticweb/loqu";

export const DocList = () => {
  //   let d = getDocs(examples[0]);
  //   console.log(d);
  const status = useAsync(getDocs, [DEFAULT_ENTRYPOINT]);
  if (status.loading) return <>Loading...</>;
  if (status.error) throw status.error;
  // return <>{`Something went wrong: ${status.error.message}`}</>;
  if (status.result) {
    console.log(status.result);

    return (
      <div>
        {status.result.doc.supportedClass
          .filter((c: IDNode) => !c["@id"].includes("hydra"))
          .map((c: any) => (
            <Card key={c["@id"]}>
              {c.title} - {c.description}
            </Card>
          ))}
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
