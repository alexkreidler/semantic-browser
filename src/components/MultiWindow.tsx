import { Session } from "./Session";
import { observer } from "mobx-react-lite";
import React from "react";
import { Collection, CollectionState } from "./Collection";
import { NewWindow, NewWindowState } from "./NewWindow";

export type MultiWindowProps = {
  data: WindowState;
  session: Session;
};

export type WindowState = NewWindowState | CollectionState;

export interface IWindowControl {
  updateCurrentWindow(data: WindowState): void;
  newWindow(data: WindowState): void;
}

// TODO: design common window base component props.
// E.g. switchWindow changes the underlying window rendered by MultiWindow
// and newWindow, obviously creates new window node
export const MultiWindow = observer(({ data, session }: MultiWindowProps) => {
  const wc: IWindowControl = {
    updateCurrentWindow: (dat) => (data = dat),
    newWindow: (dat) => session.createNode(dat),
  };

  switch (data.type) {
    case "NewWindow":
      return <NewWindow {...{ data, wc }}></NewWindow>;

    case "Collection":
      return <Collection {...{ data, wc }}></Collection>;

    default:
      return <>Whoops! There's been an error.</>;
  }
});

export type BaseState<T> = {
  data: T;
  wc: IWindowControl;
};
