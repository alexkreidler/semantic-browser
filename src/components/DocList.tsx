import React from "react";
import { DEFAULT_ENTRYPOINT, getDocs, getEntities } from "../services/get";
import { useAsync } from "react-async-hook";
import { Card } from "@blueprintjs/core";
import { IDNode } from "@semanticweb/loqu";

export const DocList = () => {
  //   let d = getDocs(examples[0]);
  //   console.log(d);
  const status = useAsync(getEntities, [DEFAULT_ENTRYPOINT]);
  if (status.loading) return <>Loading...</>;
  if (status.error) throw status.error;
  // return <>{`Something went wrong: ${status.error.message}`}</>;
  if (status.result) {
    // console.log(status.result);

    return (
      <div>
        {status.result.map((c) => (
          <Card key={c.id.value}>
            {c.title} - {c.description}
          </Card>
        ))}
      </div>
    );
  }
  return null;
};
export default DocList;
