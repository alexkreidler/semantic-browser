import { readConfigFile } from "typescript";

import React from "react";
import { BaseState } from "./MultiWindow";
import { Hydra, HydraResource, Operation } from "@alexkreidler/alcaeus";
import { observer } from "mobx-react-lite";

export type CollectionState = {
  type: "Collection";
  resourceIRI: string;
  operationIRI: string;
};

export const Collection = observer(({ data }: BaseState<CollectionState>) => {
  console.log(data);

  // Hydra.loadResource(data.resourceIRI)

  return (
    <div className="window">
      <h1>Collection</h1>
      {/* <p>{data.resource.id.value}</p> */}
    </div>
  );
});
