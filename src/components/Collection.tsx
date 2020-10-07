import { readConfigFile } from "typescript";

import React from "react";
import { BaseState } from "./MultiWindow";
import { HydraResource, Operation } from "@alexkreidler/alcaeus";
import { observer } from "mobx-react-lite";

export type CollectionState = {
  type: "Collection";
  resource: HydraResource;
  op: Operation;
};

export const Collection = observer(({ data }: BaseState<CollectionState>) => {
  console.log(data);

  return (
    <div className="window">
      <h1>Collection</h1>
      <p>{data.resource.id.value}</p>
    </div>
  );
});
