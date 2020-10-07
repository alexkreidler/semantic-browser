import React from "react";
import { EntityList } from "./EntityList";

import { DEFAULT_ENTRYPOINT, getEntities, Entity } from "../services/get";
import { useAsync } from "react-async-hook";
import { BaseState } from "./MultiWindow";
// import person from "./data.json";
// import { GenericNode } from "./GenericNode";

export type NewWindowProps = {};
export const NewWindow: React.FC<NewWindowProps> = () => {
  const stat = useAsync(getEntities, [DEFAULT_ENTRYPOINT]);
  return (
    <div className="window">
      <h1>New Window</h1>
      <p>Choose the Entity that youd'd like to explore next:</p>
      {stat.result ? (
        <EntityList entities={stat.result}></EntityList>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export type NewWindowState = {
  type: "NewWindow";
};
