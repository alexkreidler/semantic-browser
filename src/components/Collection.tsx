import { readConfigFile } from "typescript";

import React from "react";

export function Collection() {
  return <div></div>;
}

export type CollectionState = {
  type: "Collection";
  iri: string;
};
