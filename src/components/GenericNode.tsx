import React from "react";

import * as jsonld from "jsonld";
import { getProperties } from "@semanticweb/loqu";

import { useAsync } from "react-async-hook";
import { Card, Position, Tooltip } from "@blueprintjs/core";
import { statSync } from "fs";

type MinimumDataFormat = {};

type GenericNodeProps = {
  data: MinimumDataFormat;
};

type PrepResult = {
  data: any;
  properties: [object];
};

export async function prepData(data: MinimumDataFormat): Promise<PrepResult> {
  const out: any = await jsonld.compact(data, {});
  console.log(out);

  let regularProperties: [string?] = [];
  for (let [k, v] of Object.entries(out)) {
    if (typeof v == "string" && !k.includes("@")) {
      regularProperties.push(k);
    }
  }
  console.log(regularProperties);

  const typ = out["@type"];

  if (!typ) {
    throw new Error("No type found in compacted data");
  }

  if (regularProperties.length < 1) {
    throw new Error("There are no simple properties here to get");
  }
  let rp = regularProperties as [string];
  const properties = await getProperties(typ, rp);
  console.log(properties);

  return {
    data: out,
    properties,
  };
}

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
