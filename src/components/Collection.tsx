import { readConfigFile } from "typescript";

import React from "react";
import { BaseState } from "./MultiWindow";

export const Collection = ({ data, wc }: BaseState<CollectionState>) => {
  return <div></div>;
};

export type CollectionState = {
  type: "Collection";
  iri: string;
};
