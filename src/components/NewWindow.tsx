import React from "react";
import DocList from "./DocList";

// import person from "./data.json";
// import { GenericNode } from "./GenericNode";

export type NewWindowProps = {};
export const NewWindow: React.FC<NewWindowProps> = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>New Window</h1>
      <p>Choose the Entity that youd'd like to explore next</p>
      {/* <GenericNode data={person}></GenericNode> */}
      <DocList></DocList>
    </div>
  );
};

export default NewWindow;
