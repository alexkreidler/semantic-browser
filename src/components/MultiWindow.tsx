import React from "react";
import { CollectionState } from "./Collection";
import { NewWindow, NewWindowState } from "./NewWindow";

export type MultiWindowProps = {
  data: WindowState;
};

export type WindowState = NewWindowState | CollectionState;

export function MultiWindow(props: MultiWindowProps) {
  switch (props.data.type) {
    case "NewWindow":
      return <NewWindow></NewWindow>;

    default:
      return <>Whoops! There's been an error.</>;
  }
}
