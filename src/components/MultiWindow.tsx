import { Session, ViewId } from "./Session";
import { observer } from "mobx-react-lite";
import React, { createContext } from "react";
import { CollectionView, CollectionState } from "./Collection";
import { NewWindow, NewWindowState } from "./NewWindow";

import { makeAutoObservable } from "mobx";
export type MultiWindowProps = {
  id: ViewId;
  session: Session;
};

export type WindowState = NewWindowState | CollectionState;

export interface IWindowControl {
  updateCurrentWindow(data: WindowState): void;
  newWindow(data: WindowState): void;
}

// We might not have even needed to put this in its own class
// The issue was observer(Collection)
/** Window stores reference to a Session and an ID */
class Window implements IWindowControl {
  private r: Session;
  private id: ViewId;

  constructor(sess: Session, id: ViewId) {
    this.r = sess;
    this.id = id;
    makeAutoObservable(this);
  }

  newWindow = (data: WindowState) => {
    this.r.createNode(data);
  };

  updateCurrentWindow = (data: WindowState) => {
    console.log("update!");

    this.r.s.nodes[this.id].data = data;
  };
}

//@ts-ignore
export const WindowContext = createContext<IWindowControl>();

// TODO: design common window base component props.
// E.g. switchWindow changes the underlying window rendered by MultiWindow
// and newWindow, obviously creates new window node
export const MultiWindow = observer(({ id, session }: MultiWindowProps) => {
  const data = session.s.nodes[id].data;

  const ab = (d: typeof data) => {
    switch (d.type) {
      case "NewWindow":
        return <NewWindow></NewWindow>;

      case "Collection":
        return <CollectionView data={d}></CollectionView>;

      default:
        return <>Whoops! There's been an error.</>;
    }
  };

  return (
    <WindowContext.Provider value={new Window(session, id)}>
      {ab(data)}
    </WindowContext.Provider>
  );
});

export type BaseState<T> = {
  data: T;
  // We used to pass window controller through props
  // It's easier via context
  // wc: IWindowControl;
};
