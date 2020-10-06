import React from "react";

import * as jsonld from "jsonld";
import {
  getProperties,
  MinimumDataFormat,
  PrepResult,
  prepData,
} from "@semanticweb/loqu";

import { useAsync } from "react-async-hook";
import { Card, Position, Tooltip } from "@blueprintjs/core";
import { statSync } from "fs";

type GenericNodeProps = {
  data: MinimumDataFormat;
};

const LocalProperties = ({ data }: { data: PrepResult }) => {
  let out = [];
  console.log(data);

  for (let a of data.properties) {
    let v = a as any;
    let id = v["@id"];
    console.log(id);
    let value = data.data[id];
    out.push(
      <div className="datum">
        <div className="property">
          <Tooltip
            hoverOpenDelay={80}
            content={v.comment}
            position={Position.TOP}
          >
            {v.label}
          </Tooltip>
        </div>
        <div className="value">{value}</div>
      </div>
    );
  }
  return <div>{out}</div>;
};

export const GenericNode = ({ data }: GenericNodeProps) => {
  //   let d = getDocs(examples[0]);
  //   console.log(d);
  const status = useAsync(prepData, [data]);
  // if (status.loading) return <>Loading...</>;
  if (status.error)
    return <>{`Something went wrong: ${status.error.message}`}</>;
  if (status.result) {
    return (
      <>
        <LocalProperties data={status.result}></LocalProperties>
      </>
    );
  }

  // return <div>Hi</div>;
  return <>Loading...</>;
};
